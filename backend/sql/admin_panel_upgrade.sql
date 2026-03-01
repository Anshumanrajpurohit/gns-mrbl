-- Admin Panel Upgrade Migration (idempotent, PostgreSQL/Neon compatible)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1) Admin account lock columns
ALTER TABLE admins
  ADD COLUMN IF NOT EXISTS failed_login_attempts INT NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS locked_until TIMESTAMPTZ NULL;

-- 2) Enquiry soft delete column
ALTER TABLE enquiries
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ NULL;

-- 3) Admin settings table (stores notification email in DB)
CREATE TABLE IF NOT EXISTS admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(120) NOT NULL UNIQUE,
  value TEXT NOT NULL,
  updated_by UUID NULL REFERENCES admins(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed notification email from first admin if missing.
INSERT INTO admin_settings (key, value, updated_by)
SELECT 'notification_email', a.email, a.id
FROM admins a
WHERE NOT EXISTS (
  SELECT 1
  FROM admin_settings s
  WHERE s.key = 'notification_email'
)
ORDER BY a.created_at ASC
LIMIT 1;

-- 4) Admin activity log table
CREATE TABLE IF NOT EXISTS admin_activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
  action VARCHAR(120) NOT NULL,
  entity VARCHAR(80) NOT NULL,
  entity_id UUID NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5) Indexes
CREATE INDEX IF NOT EXISTS idx_admin_activity_logs_created_at_desc
  ON admin_activity_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_activity_logs_admin_id_created_at_desc
  ON admin_activity_logs (admin_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_not_deleted_created_at_desc
  ON enquiries (created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_enquiries_deleted_at_desc
  ON enquiries (deleted_at DESC) WHERE deleted_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_admins_locked_until
  ON admins (locked_until) WHERE locked_until IS NOT NULL;

-- 6) Trigger support for admin_settings.updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_admin_settings_updated_at ON admin_settings;
CREATE TRIGGER trg_admin_settings_updated_at
BEFORE UPDATE ON admin_settings
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
