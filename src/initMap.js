import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import PropTypes from 'prop-types'
import './App.css';
import escapeRegexp from 'escape-string-regexp'
import foursquareicon from './img/foursquare.png' 


var foursquare = require('react-foursquare')({
  clientID: 'H0Y5A0EXRKPTJLPWTJ1E3HF415HAEHX3R4BECAAZWXODGKHD',
  clientSecret: 'XRJ4NBTPMURF2OC0PXJVJHUQMN0BO2HZ2K2Q21FSSD2F3NAZ'  
});


export class Mapinit extends Component {

   static propTypes = {
    Locations: PropTypes.array.isRequired,
  }

    state = {
    query: '',
    Activeloc:'',
    CurLocations:this.props.Locations,
    Activeposition:{lat:0,lng:0},
    Activetitle:'',
    showingInfoWindowLi:false,
    params:{ll:"",query:''},
    ActiveAddress:'',
    ActivecrossStreet:"",
    ActiveCat:"",
    ActiveMarker:{}
  };

   
   //When a marker clicked this will be work:make the marker activeMarker and then call foursquareinfo() to get onfo from foursquare
  onMarkerClick = (props, marker, e) =>{

   this.state.ActiveMarker=marker
    let mark= this.state.CurLocations.filter((loc)=>loc.title===props.title) 
    this.foursquareinfo(mark)

   }

   // /When a Location from the list clicked this will be work: search for the position for get more info from foursquare to be display
   // I don't know how to make the marker active so I displed the infowindow at the marker's position
   onLiClick=(e)=>{
this.state.ActiveMarker=null
  let mark= this.state.CurLocations.filter((loc)=>loc.title===e.target.innerHTML)
  this.foursquareinfo(mark)
  }

   
   Update=(e)=>{
   this.setState({query:e.target.value})
  }

// get information from foursquare and then setState
   foursquareinfo=(mark)=>{
        let lat=mark[0].lat.toString()
        let lng=mark[0].lng.toString()
        this.state.params={ll:lat+","+lng , query:mark[0].title}
        
       foursquare.venues.getVenues(this.state.params)
       .then(res=> {
        this.setState({
          Activeposition:{lat:mark[0].lat,lng:mark[0].lng},
          Activetitle:res.response.venues[0].name,
          ActiveAddress:res.response.venues[0].location.address,
          showingInfoWindowLi:true,
          params:{ll:lat+","+lng , query:mark[0].title},
          ActivecrossStreet:res.response.venues[0].location.crossStreet,
          ActiveCat:res.response.venues[0].categories[0].name,
          Activeloc:mark[0].title
           })}).catch(err=>{

            this.setState({
               Activeposition:{lat:mark[0].lat,lng:mark[0].lng},
               Activetitle:mark[0].title,
               showingInfoWindowLi:true,
               params:{ll:lat+","+lng , query:mark[0].title},
               Activeloc:mark[0].title,
               ActiveAddress:"Foursquare Venue Details request failed. Try again later..."

                }) });

   }
   
 //in reander :
  // when the search input change this will be change the locations list based on the input
  //create markers and make the active marker BOUNCE
  //the window will be active when clicked in location from markers or list
  render() {
    const Locations=this.props.Locations

    if (this.state.query){
        const match= new RegExp(escapeRegexp(this.state.query),'i')
        this.state.CurLocations=Locations.filter((location)=>match.test(location.title) )
      }else
        this.state.CurLocations=Locations
    
     return (
      <div>
        <div className="map" role="application">
          <Map google={this.props.google} zoom={10} initialCenter={{
              lat: 24.774265,
              lng: 46.738586
            }} 
            mapTypeControl= {true}>
             
               { this.state.CurLocations.filter((loc)=>this.state.Activeloc!==loc.title).map((loc)=>
                   <Marker   key={loc.loc} onClick={this.onMarkerClick}
                   title={loc.title}
                   name={loc.title}
                   position={{lat: loc.lat, lng: loc.lng}}                 
                   />
                 )}
                
                <Marker  onClick={this.onMarkerClick}
                   title={this.state.Activeloc}
                   name={this.state.Activeloc}
                   position={this.state.Activeposition}
                   animation={this.props.google.maps.Animation.BOUNCE  }              
                   />

           <InfoWindow
              marker={this.state.ActiveMarker}
              position={this.state.Activeposition}
              visible={this.state.showingInfoWindowLi}>
              <div style={{width: '24vmin'}}>
                <h5>{this.state.Activetitle}</h5>
                <p>{this.state.ActiveCat}</p>
                <p>{this.state.ActiveAddress}</p>
                <p>{this.state.ActivecrossStreet}</p>
              </div>
           </InfoWindow>

         
         </Map>

     </div>
         
         <div className="filter">
           <h1 className="Text" role="heading">Neighborhood Map</h1>
           <div className="search-books">
            <div className="search-books-bar">
             <div className="search-books-input-wrapper" role="search">
              <input type="text" placeholder="Search Locations..." value={ this.state.query }
                onChange={ this.Update } />
             </div>
            </div>
            <div className="search-books-results"role="presentation">
             <ul className="books-grid" role="list">
               {this.state.CurLocations.length>0 && this.state.CurLocations.map((loc)=> <li  key={loc.loc} onClick={this.onLiClick}><h2 role="heading">{loc.title}</h2></li>)}
             </ul>
            </div>
           </div>
           <img src={foursquareicon} alt="Powered by Foursquare" className="fs-logo"/>
         </div>

     </div>
    );
    
  }
}
export default GoogleApiWrapper({
  apiKey: ('AIzaSyD4mocW8DErLIICEp21NqEqAe1vIjII5hk')
})(Mapinit)

 
  