<!--
<script lang="ts">
  import { governanceStore } from "$lib/stores/governance-store"
  import LocalSpinner from "$lib/components/local-spinner.svelte";
  import { isError } from "$lib/utils/helpers";
    import type { FixtureDTO } from "../../../../../../declarations/backend/backend.did";

  interface UploadData {
    id: number;
    gameweek: number;
    kickOff: number;
    homeClubId: number;
    awayClubId: number;
  }

  export let visible: boolean;
  export let closeModal: () => void;

  let file: File | null = null;
  let fixtureData: FixtureDTO[] = [];

  let isLoading = false;
  let showConfirm = false;

  $: isSubmitDisabled = fixtureData.length == 0;

  $: if (isSubmitDisabled && showConfirm) {
    showConfirm = false;
  }

  async function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    file = input.files[0];
    await processFile(file);
  }

  async function processFile(file: File) {
    const text = await file.text();
    let uploadedData = parseCSV(text) as UploadData[];
    fixtureData = uploadedData.map(mapUploadDataToFixtureDTO);
  }

  function mapUploadDataToFixtureDTO(uploadData: UploadData): FixtureDTO {
    return {
      id: uploadData.id,
      gameweek: uploadData.gameweek, //TODO: Remove
      kickOff: BigInt(uploadData.kickOff),
      homeClubId: uploadData.homeClubId,
      awayClubId: uploadData.awayClubId,
      status: { Unplayed: null },
      highestScoringPlayerId: 0,
      seasonId: 0, //TODO: Remove
      events: [],
      homeGoals: 0,
      awayGoals: 0,
    };
  }

  function parseCSV(csvText: string): any[] {
    const rows = csvText.split("\n");
    return rows.map((row) => {
      const columns = row.split(",");
      return {
        id: parseInt(columns[0]),
        gameweek: parseInt(columns[1]),
        kickOff: parseInt(columns[2]),
        homeClubId: parseInt(columns[3]),
        awayClubId: parseInt(columns[4]),
      };
    });
  }

  function raiseProposal() {
    showConfirm = true;
  }

  async function confirmProposal() {
    isLoading = true;
    let result = await governanceStore.addInitialFixtures(
      fixtureData,
      0,
      ""
    );
    if (isError(result)) {
      isLoading = false;
      console.error("Error submitting proposal");
      return;
    }
    isLoading = false;
    resetForm();
    closeModal();
  }

  function resetForm() {
    file = null;
    fixtureData = [];
  }

  function cancelModal() {
    resetForm();
    closeModal();
  }
</script>

<Modal showModal={visible} onClose={closeModal}>
  <div class="mx-4 p-4">
    <div class="flex justify-between items-center my-2">
      <h3 class="default-header">Add Initial Fixtures</h3>
      <button class="times-button" on:click={cancelModal}>&times;</button>
    </div>

    <div class="flex justify-start items-center w-full">
      <div class="w-full flex-col space-y-4 mb-2">
        <div class="flex-col space-y-2">
          <p>Please select a file to upload:</p>
          <input
            class="my-4"
            type="file"
            accept=".csv"
            on:change={handleFileChange}
          />
        </div>

        <div class="border-b border-gray-200" />

        <div class="items-center flex space-x-4">
          <button
            class="px-4 py-2 brand-cancel-button min-w-[150px]"
            type="button"
            on:click={cancelModal}
          >
            Cancel
          </button>
          <button
            class={`${isSubmitDisabled ? "brand-button-disabled" : "brand-button"} 
                        px-4 py-2 min-w-[150px]`}
            on:click={raiseProposal}
            disabled={isSubmitDisabled}
          >
            Raise Proposal
          </button>
        </div>

        {#if showConfirm}
          <div class="items-center flex">
            <p class="text-orange-400">
              Failed proposals will cost the proposer 10 $FPL tokens.
            </p>
          </div>
          <div class="items-center flex">
            <button
              class={`${isSubmitDisabled ? "brand-button-disabled" : "brand-button"} 
                            px-4 py-2 w-full`}
              on:click={confirmProposal}
              disabled={isSubmitDisabled}
            >
              Confirm Submit Proposal
            </button>
          </div>
        {/if}
      </div>
    </div>

    {#if isLoading}
      <LocalSpinner />
    {/if}
  </div>
</Modal>-->