import * as registry from "../state-management/registry";

function checkStoreMutations(dispatchIdx, goldenDispatchId, goldenMutationEvent) {
    const [dispatchId, mutationEvent] = registry.dispatch.mock.calls[dispatchIdx];

    expect(dispatchId).toEqual(goldenDispatchId);
    expect(mutationEvent()).toEqual(goldenMutationEvent);
}

export default checkStoreMutations;
