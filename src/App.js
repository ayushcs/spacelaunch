import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from './components/Card';
import { Button } from '@mui/material';
function App() {
  let [data, setData] = useState([]);
  let [newUrl, setnewUrl] = useState('');
  let [filterBy, setfilterBy] = useState({
    launch_year: null,
    launch_success: null,
    landing_success: null,
  });

  

  let year =  [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]
  useEffect(()=> {
    axios.get(process.env.REACT_APP_API + newUrl)
    .then(function (response) {
      setnewUrl('')
      data = response.data;
      setData([...data])
    })
  }, [filterBy])


  const changeFilter = (type, value) => {
    if (value == null) {
      value = false
    }
    let newVal = (filterBy[type] == value) ? null : value;
    let filters = Object.assign({}, filterBy);
    filters[type] = newVal;

    if (filters['launch_year']) {
      newUrl += `&launch_year=${filters['launch_year']}`;
    }
    if (filters['launch_success'] == true) {
      newUrl += `&launch_success=true`;
    }
    if (filters['launch_success'] == false) {
      newUrl += `&launch_success=false`;
    }
    if (filters['landing_success'] == true) {
      if (filters['launch_success'] == null) {
        newUrl += `&launch_success=true&landing_success=true`;
      } else {
        newUrl += `&landing_success=true`;
      }
    }
    if (filters['landing_success'] == false) {
      if (filters['launch_success'] == null) {
        newUrl += `&launch_success=false&landing_success=false`;
      } else {
        newUrl += `&landing_success=false`;
      }
    }
    setnewUrl(newUrl)
    setfilterBy({...filters})
  }

  return (
    <div className="app__content">
      <div className='app__body'>
        <div className="app__filter">
          <div className="filterPanel">
            <div className="filter__header">
                <h4 className="filter__title">Filters</h4>
            </div>
            <div className="filter__launchYear">
                <div className="subPanel">
                    <div className="subPanel__header">
                        <h4 className="subPanel__title">Launch year</h4>
                    </div>
                    <div className="subPanel__years">
                        { year.map((item)=> {
                          return (
                            <div className="button__container" key={item}>
                              <div id={item} className="year__button">
                                <Button variant={filterBy.launch_year == item ? 'contained' : 'outlined'} onClick={()=> changeFilter('launch_year', item)} color="success">{item}</Button>
                              </div>
                          </div>
                          )
                        })}
                    </div>
                </div>
            </div>
            <div className="filter__launchYear">
                <div className="subPanel">
                    <div className="subPanel__header">
                        <h4 className="subPanel__title">Successful Launch</h4>
                    </div>
                    <div className="subPanel__years">
                        <div className="button__container">
                            <div className="year__button">
                                <Button variant={filterBy.launch_success== true ? 'contained' : 'outlined'} onClick={()=> changeFilter('launch_success', true)} color="success">True</Button>
                            </div>
                        </div>
                        <div className="button__container">
                            <div className="year__button">
                              <Button variant={filterBy.launch_success == false ? 'contained' : 'outlined'} onClick={()=> changeFilter('launch_success', false)} color="success">False</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="filter__landingYear">
                <div className="subPanel">
                    <div className="subPanel__header">
                        <h4 className="subPanel__title">Successful Landing</h4>
                    </div>
                    <div className="subPanel__years">
                        <div className="button__container">
                            <div className="year__button">
                                <Button variant={filterBy.landing_success == true ? 'contained' : 'outlined'} onClick={()=> changeFilter('landing_success', true)} color="success">True</Button>
                            </div>
                        </div>
                        <div className="button__container">
                            <div className="year__button">
                              <Button variant={filterBy.landing_success == false ? 'contained' : 'outlined'} onClick={()=> changeFilter('landing_success', false)} color="success">False</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div className="app__cards">
          <div className='card__container'>
            {
              data.length > 0 && data.map((item, index) => {
                return (
                  <div className="card" key={index +'_'+item.flight_number}>
                  <Card 
                      flightNumber={item.flight_number} 
                      missionid={item.mission_id} 
                      missionname={item.mission_name}
                      launch_year={item.launch_year}
                      success={item.launch_success ? true : false}
                      landing= {item.launch_failure_details ? false : true}
                      img= {item.links.mission_patch_small}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
