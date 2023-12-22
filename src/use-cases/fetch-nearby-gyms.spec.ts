import { describe } from "node:test";
import { beforeEach, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gym Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: "The best gym",
      phone: "14112312312",
      latitude: -22.871954,
      longitude: -49.237446,
    });

    await gymsRepository.create({
      title: "Far Gym",
      description: "The best gym",
      phone: "14112312312",
      latitude: -23.0392961,
      longitude: -49.1605379,
    });

    const { gyms } = await sut.execute({
      userLatitude: -22.88573,
      userLongitude: -49.237446,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
