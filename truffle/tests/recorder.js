var Recorder = artifacts.require("Recorder");
contract('Recorder', (accounts) => {
  it("records event", (done) => {
    Recorder.deployed().then((instance) => (
      instance
        .Record({}, {fromBlock: 0, toBlock: "latest"})
        .get((error, events) => {
          assert.equal(
            0,
            events.length,
            "There should be no events at start."
          );
          instance.record("pokemon").then(() => (
            instance
              .Record({}, {fromBlock: 0, toBlock: "latest"})
              .get((error, events) => {
                assert.equal(
                  1,
                  events.length,
                  "There should be one event after recording."
                );
                done();
              })
          ));
        })
    ));
  });
});
