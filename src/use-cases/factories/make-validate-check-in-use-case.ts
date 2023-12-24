import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckInUseCase } from "../validate-check-ins";

export function makeValidateCheckInsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const validateCheckInsUseCase = new ValidateCheckInUseCase(
    checkInsRepository
  );
  return validateCheckInsUseCase;
}
