pragma solidity 0.4.24;

/**
 * @title Recorder — record a message into the blockchain
 * @author Life on Mars — https://lifeonmars.pt
 */
contract Recorder{
  event Record(
    address _from,
    string _message
  );

  /**
   * @notice Sends the contract a message
   * to record into the blockchain
   * @param message  message to record
   */
  function record(string message) public {
    emit Record(msg.sender, message);
  }
}
