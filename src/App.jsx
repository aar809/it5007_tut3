
class AddTraveller extends React.Component {
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(e){
    e.preventDefault();
    const form = document.forms.travellerAddForm;
    const traveller = {
      name: form.name.value, 
      phoneNumber: form.phoneNumber.value, 
    }
    this.props.createTraveller(traveller);
    form.name.value = ""; 
    form.phoneNumber.value = "";
  }
  render() {
    const travellerList = this.props.travellerList
    return (
      <div>
        <center>
        <div>Enter the traveller's name and phone number and then click "Add" to book the ticket.</div>
        <div>
          Seats Available: <b> {25 - travellerList.length} </b>
        </div></center>
       <br/>
      <div className="component">
      <center><h3>Add Traveller</h3></center>
      <form name="travellerAddForm" onSubmit={this.handleSubmit}>
        <label htmlFor="name"><b>Name: </b></label> <br/>
        <input type="text" name="name" placeholder="Name" id="name" /> <br/>
        <br/>
        <label htmlFor="phoneNumber"><b>Phone Number: </b></label> <br/>
        <input type="text" name="phoneNumber" placeholder="Phone Number" id="phoneNumber" /> <br/>
        <br/>
        <button className='button'>Add</button>
      </form>
      </div>
      </div>
    );
  }
}

class DeleteTraveller extends React.Component {
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    const form = document.forms.travellerDeleteForm;
    const traveller = {
      id: form.id.value,
    }
    this.props.deleteTravellerFunction(traveller);
    form.id.value = "";
  }
  render() {
    const travellerList = this.props.travellerList
    return (
      <div>
        <center>
        <div>Enter the Ticket ID of the ticket you wish to delete, and click "Delete" to remove a ticket.</div>
        <div>
          Seats Available: <b> {25 - travellerList.length} </b>
        </div></center>
       <br/>
      <div className="component">
      <center><h3>Delete Traveller</h3></center>
      <form name="travellerDeleteForm" onSubmit={this.handleSubmit}>
        <label htmlFor="id"><b>Ticket ID: </b></label> <br/>
        <input type="text" name="id" placeholder="Ticket ID" id="id" /> <br/>
        <br/>
        <button className="button">Delete</button>
      </form>
      </div>
      </div>
    );
  }
}



function DisplayTraveller(props){
  const travellerRows = props.travellerList.map(x => 
    <TravellerRow key={x.id} traveller={x} />);
    return (
      <div className="component">
      <center><h3>Display Travellers</h3>
      <div>
          Seats Available: <b> {25 - props.travellerList.length} </b>
      </div> </center>
      <br/>
      <table className="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Booking Date</th>
        </tr>
      </thead>
      <tbody>
        {travellerRows}
      </tbody>
    </table>
    </div>    
    );
  } 


function TravellerRow(props){
  const traveller = props.traveller;
  return (
  <tr>
    <td>{traveller.id}</td>
    <td>{traveller.name}</td>
    <td>{traveller.phoneNumber}</td>
    <td>{traveller.created.toDateString()}</td>
  </tr>
  )
}

function FreeSeats(props){
  const seatsList = []
  const travellerList = props.travellerList
  length = props.travellerList.length
  for (let i=0; i < 25; i++){
    if (i < length) {
      seatsList[i] = {"id":i, "taken":1}  
    } else {
      seatsList[i] = {"id":i, "taken":0}
    }
  }
  const travellerBoxes = seatsList.map(x => 
    <SeatBox key={x.id} id={x.id} taken={x.taken} />);
  return (
    <div className="component">
      <h3>Display Free Seats</h3>
      Seats Available: <b>{25 - length}</b>
      <div style={{'backgroundColor':"rgb(189, 189, 189)", 'width':'100px'}}> <b>Taken</b></div>
      <div style={{'backgroundColor':'lightgreen','width':'100px'}}><b>Free</b></div>
      
      <br/>
      <div>
      {/* <div style={{'width':'100px'}}><b>Seat ID</b></div> */}
      <div className="box">
        {travellerBoxes}
      </div>
      </div>
    </div>
  )
}

function SeatBox(props){
  return (
    <div className={props.taken === 1 ? "seat-taken" : "seat-free"}> {props.taken===1?"Taken" : "Free"}</div>   //{props.id +1}
  )
}

function Homepage(){
  return(
    <div>
      <br/>
      <br/>
      <center><h3>Welcome to Singapore High-Speed Intercontinental Railway's Train Ticket Booking System!</h3>
      <h3>#1 in the World!</h3></center>
    </div>
  )
}

class Parent extends React.Component {
  constructor() {
    super();
    this.state = { travellerList: [], page: "homepage", id:1};
    this.createTraveller = this.createTraveller.bind(this);
    this.deleteTravellerFunction = this.deleteTravellerFunction.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellerList: [], page:"homepage", id:1 });   
    }, 500);
  }

  createTraveller(traveller) {
    traveller.id = this.state.id;
    traveller.created = new Date();
    const newTravellerList = this.state.travellerList.slice();
    // console.log(newTravellerList)
    newTravellerList.push(traveller);
    if (newTravellerList.length > 25){
      console.log("You shall not pass!")
      alert("Error: Max Occupancy (25) reached. The train is full!");
      return
    }
    var letter = /^[a-zA-Z\s]+$/;
    var number = /^[0-9\s\-]+$/;
    if(!traveller.name.match(letter)) {
        console.log("You shall not pass!")
        alert("Error: Must enter a valid name (letters only).");
        return
    }
    if (!traveller.phoneNumber.match(number)){
        console.log("You shall not pass!")
        alert("Error: Must enter a valid phone number (numbers only).");
        return
    }
    this.setState({ travellerList: newTravellerList });
    this.setState({id: traveller.id+1})
    // console.log("createTraveller", this.state.travellerList)
    alert("Ticket #" + traveller.id + " has been successfully booked!");
  }

  deleteTravellerFunction(traveller) {
    const id = traveller.id
    console.log(id)
    console.log(this.state.travellerList)
    const newTravellerList = this.state.travellerList.slice();
    
    for (var i=0; i < this.state.travellerList.length; i++){
      console.log("name:", this.state.travellerList[i].name)
      if (parseInt(this.state.travellerList[i].id) === parseInt(id)){
        if (confirm("Confirmation: Are you sure you want to delete ticket #"
         + this.state.travellerList[i].id + ', ' + this.state.travellerList[i].name + ' (' + this.state.travellerList[i].phoneNumber + ')?') == false){
          return
        }
        newTravellerList.splice(i, 1);
        console.log("deleted")
        alert("Ticket #" + this.state.travellerList[i].id + ', ' + this.state.travellerList[i].name + ' (' + this.state.travellerList[i].phoneNumber + '), has been successfully deleted.');
        this.setState({ travellerList: newTravellerList });
        return
      }
    }
    alert("Error: this ticket ID does not exist.")
    console.log("trav list:", this.state.travellerList)
  }

  hideComponent(page) {
    this.setState({page: page});
  }

  render() {
    return (
      <React.Fragment>
        <h2 id="top_banner"> 
            {/* <img src='train.png' alt="logo" style="width:100px;" id="logo" /> */}
            SINGAPORE HIGH-SPEED INTERCONTINENTAL RAILWAY
        </h2>
    
        <nav>
            <ul>
                <li><div onClick={() => this.hideComponent("homepage")}>
                Homepage
                </div></li>
                <li><div onClick={() => this.hideComponent("addTraveller")}>
                Add Traveller
                </div></li>
                <li><div onClick={() => this.hideComponent("deleteTraveller")}>
                Delete Traveller
                </div></li>
                <li><div onClick={() => this.hideComponent("displayTravellers")}>
                Display Traveller List
                </div></li>
                <li><div onClick={() => this.hideComponent("displayFreeSeats")}>
                Display Free Seats
                </div></li>
                
            </ul>
        </nav>        

        <center><h1>Train Ticket Booking System</h1></center>
        <hr />
      <div className="component-container">
        {this.state.page==="homepage" && <Homepage />}
        
        {this.state.page==="addTraveller" && <AddTraveller createTraveller={this.createTraveller} 
                                                          travellerList={this.state.travellerList}
                                                          />}
        
        {this.state.page==="deleteTraveller" && <DeleteTraveller deleteTravellerFunction={this.deleteTravellerFunction} 
                                                              travellerList={this.state.travellerList}
                                                              />}
        
        {this.state.page==="displayTravellers" && <DisplayTraveller travellerList={this.state.travellerList} />}

        {this.state.page==="displayFreeSeats" && <FreeSeats travellerList={this.state.travellerList} />}
      </div>
      </React.Fragment>
    );
  }
}

const element = <Parent />;
ReactDOM.render(element, document.getElementById('contents'));