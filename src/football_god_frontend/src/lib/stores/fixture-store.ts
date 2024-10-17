import { writable } from "svelte/store";
import { FixtureService } from "$lib/services/fixture-service";
import type { FixtureDTO } from "../../../../declarations/football_god_backend/football_god_backend.did";

function createFixtureStore() {
  const { subscribe, set } = writable<FixtureDTO[]>([]);

  async function getPostponedFixtures(): Promise<FixtureDTO[]> {
    return new FixtureService().getPostponedFixtures();
  }

  async function getNextFixture(): Promise<FixtureDTO | undefined> {
    let fixtures: FixtureDTO[] = [];
    await subscribe((value) => {
      fixtures = value;
    })();

    if (fixtures.length == 0) {
      return;
    }
    const now = new Date();
    return fixtures.find(
      (fixture) => new Date(Number(fixture.kickOff) / 1000000) > now,
    );
  }

  return {
    subscribe,
    setFixtures: (fixtures: FixtureDTO[]) => set(fixtures),
    getNextFixture,
    getPostponedFixtures,
  };
}

export const fixtureStore = createFixtureStore();
