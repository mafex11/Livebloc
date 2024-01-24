// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract EventScheduler {

    struct CreateEvent {
        address creater;
        string title;
        string subtitle;
        uint256 startdate;
        uint256 endDate;
        uint256 price;
        uint256 totalParticipants;
        string streamLink;
        address[] participants;
        uint256[] amount;
    }

    mapping (uint256 => CreateEvent) public events;
    uint256 public eventCount = 0;

    function CreateEvents(address _creater, string memory _title, string memory _subtitle, uint256 _startdate, uint256 _enddate, uint256 _price, uint256 _totparticipants, string memory _streamLink) public returns (uint256) {
        eventCount++;
        CreateEvent storage newevent = events[eventCount];
        
        newevent.creater = _creater;
        newevent.title = _title;
        newevent.subtitle = _subtitle;
        newevent.startdate = _startdate;
        newevent.price = _price;
        newevent.totalParticipants = _totparticipants;
        newevent.endDate = _enddate;
        newevent.streamLink = _streamLink;

        return eventCount-1;
    }
 
    function JoinEvent(string memory _Title) public payable {
        uint256 eventFee = msg.value;

        uint256 foundEventId;
        for (uint256 i = 1; i <= eventCount; i++) {
            CreateEvent storage currentEvent = events[i];
            if (keccak256(abi.encodePacked(currentEvent.title)) == keccak256(abi.encodePacked(_Title))) {
                foundEventId = i;
                break;
            }
        }

        require(foundEventId > 0 && foundEventId <= eventCount, "Event not found");

        CreateEvent storage foundEvent = events[foundEventId];
        
        require(foundEvent.participants.length < foundEvent.totalParticipants, "Event is full. Cannot accept more participants.");
        require(foundEvent.price == eventFee, "Incorrect amount sent. Please check the event fee.");

        (bool success, ) = payable(address(foundEvent.creater)).call{value: eventFee}("");
        require(success, "Payment failed. Make sure you have enough Ether and try again.");

        foundEvent.participants.push(msg.sender);
        foundEvent.amount.push(eventFee);
    }

    function getAmountCollected(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        return(events[_id].participants, events[_id].amount);
    }

    function GetScheduledEvents() public view returns (CreateEvent[] memory){
        CreateEvent[] memory TotalEvents = new CreateEvent[](eventCount);

        for(uint i=0 ; i < eventCount ; i++) {
            CreateEvent storage EventsInTotal = events[i];
            TotalEvents[i] = EventsInTotal;
        }

        return TotalEvents;
    }

    function withdraw(uint256 _id) public {
        CreateEvent storage currentEvent = events[_id];
        require(currentEvent.participants.length > 0, "No participants inside");

        uint256 customerDiscount = 90;
        uint256 companyDiscount = 4;
        uint256 creatorDiscount = 6;

        uint256 customerShare = (currentEvent.price * customerDiscount) / 100;
        uint256 companyShare = (currentEvent.price * companyDiscount) / 100;
        uint256 creatorShare = (currentEvent.price * creatorDiscount) / 100;

        for (uint256 i = 0; i < currentEvent.participants.length; i++) {
            address participant = currentEvent.participants[i];
            uint256 amount = currentEvent.amount[i];
            payable(participant).transfer(amount * customerDiscount / 100);
        }

        payable(address(0xB5F299478C1D660459cc02Ea6F3D1A5837649D0B)).transfer(companyShare);
        payable(currentEvent.creater).transfer(creatorShare);

        delete currentEvent.participants;
    }
}