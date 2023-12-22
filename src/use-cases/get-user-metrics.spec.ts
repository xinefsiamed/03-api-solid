import { describe } from "node:test";
import { beforeEach, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("Get User Metrics Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    // gymsRepository = new InMemoryGymsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository);

    // await gymsRepository.create({
    //   id: 'gym-01',
    //   title: 'JavaSript Academy',
    //   description: '',
    //   phone: '',
    //   latitude: -22.88573,
    //   longitude: -49.237446,
    // })
  });

  it("should be able to get check-ins count from metrics", async () => {
    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    await checkInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    const { checkInsCount } = await sut.execute({
      userId: "user-01",
    });

    expect(checkInsCount).toEqual(2);
  });
});
