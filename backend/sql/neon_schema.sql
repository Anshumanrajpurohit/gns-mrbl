-- Enable UUID generation helpers.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Core admin users table.
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role VARCHAR(32) NOT NULL CHECK (role IN ('admin')),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  failed_login_attempts INT NOT NULL DEFAULT 0,
  locked_until TIMESTAMPTZ NULL,
  last_login_at TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Customer enquiries table.
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(80) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(120) NOT NULL,
  service VARCHAR(80) NOT NULL,
  message TEXT NOT NULL,
  contacted BOOLEAN NOT NULL DEFAULT FALSE,
  contacted_at TIMESTAMPTZ NULL,
  deleted_at TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Admin settings table.
CREATE TABLE IF NOT EXISTS admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(120) NOT NULL UNIQUE,
  value TEXT NOT NULL,
  updated_by UUID NULL REFERENCES admins(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Admin activity logs.
CREATE TABLE IF NOT EXISTS admin_activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
  action VARCHAR(120) NOT NULL,
  entity VARCHAR(80) NOT NULL,
  entity_id UUID NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Useful indexes for dashboard filtering and sorting.
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at_desc ON enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_contacted_created_at_desc ON enquiries (contacted, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_not_deleted_created_at_desc ON enquiries (created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_enquiries_deleted_at_desc ON enquiries (deleted_at DESC) WHERE deleted_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins (email);
CREATE INDEX IF NOT EXISTS idx_admins_locked_until ON admins (locked_until) WHERE locked_until IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_admin_activity_logs_created_at_desc ON admin_activity_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_activity_logs_admin_id_created_at_desc ON admin_activity_logs (admin_id, created_at DESC);

-- Full text index for enquiry search.
CREATE INDEX IF NOT EXISTS idx_enquiries_search_tsv ON enquiries
USING GIN (
  to_tsvector(
    'simple',
    coalesce(name, '') || ' ' ||
    coalesce(phone, '') || ' ' ||
    coalesce(email, '') || ' ' ||
    coalesce(service, '') || ' ' ||
    coalesce(message, '')
  )
);

-- Keep updated_at in sync automatically.
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_admins_updated_at ON admins;
CREATE TRIGGER trg_admins_updated_at
BEFORE UPDATE ON admins
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_enquiries_updated_at ON enquiries;
CREATE TRIGGER trg_enquiries_updated_at
BEFORE UPDATE ON enquiries
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_admin_settings_updated_at ON admin_settings;
CREATE TRIGGER trg_admin_settings_updated_at
BEFORE UPDATE ON admin_settings
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- Default admin seed (idempotent).
INSERT INTO admins (email, password_hash, role, is_active)
VALUES (
  'admin@system.com',
  '$2a$10$qmjbF7I48OHE1BMsj5EIR.vZG6enJutkB8NosSbdl.rCt6uB7iYPS',
  'admin',
  TRUE
)
ON CONFLICT (email) DO NOTHING;

INSERT INTO admin_settings (key, value, updated_by)
SELECT 'notification_email', a.email, a.id
FROM admins a
WHERE NOT EXISTS (
  SELECT 1 FROM admin_settings s WHERE s.key = 'notification_email'
)
ORDER BY a.created_at ASC
LIMIT 1;
