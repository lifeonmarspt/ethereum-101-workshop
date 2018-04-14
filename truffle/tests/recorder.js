var Recorder = artifacts.require("Recorder");
contract('Recorder', function(accounts) {
  it("records event", function(done) {
    Recorder.deployed().then(function (instance) {
      instance
        .Record({}, {fromBlock: 0, toBlock: "latest"})
        .get(function (error, events) {
          assert.equal(
            0,
            events.length,
            "There should be no events at start."
          );
          instance.record("pokemon").then(function () {
            instance
              .Record({}, {fromBlock: 0, toBlock: "latest"})
              .get(function (error, events) {
                assert.equal(
                  1,
                  events.length,
                  "There should be one event after recording."
                );
                done();
              });
          });
        });
    });
  });
});
