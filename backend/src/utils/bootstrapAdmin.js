import bcrypt from "bcryptjs";
import * as adminRepository from "../repositories/adminRepository.js";

const bootstrapAdmin = async () => {
  const { count } = await adminRepository.countAdmins();
  if (count > 0) {
    return;
  }

  const email = process.env.ADMIN_DEFAULT_EMAIL;
  const password = process.env.ADMIN_DEFAULT_PASSWORD;

  if (!email || !password) {
    console.warn("No default admin created. Provide ADMIN_DEFAULT_EMAIL and ADMIN_DEFAULT_PASSWORD.");
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await adminRepository.createAdmin({
    email: email.toLowerCase(),
    passwordHash,
    role: "admin",
    isActive: true,
  });
  console.log(`Bootstrapped default admin: ${email}`);
};

export { bootstrapAdmin };
