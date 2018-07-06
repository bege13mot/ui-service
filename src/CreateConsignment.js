import React from 'react';
// import _ from 'lodash';


class CreateConsignment extends React.Component {

  state = {
    created: false,
    description: '',
    weight: 0,
    containers: [],
    consignments: [],
  }

  componentWillMount() {
    let token = localStorage.getItem('token');
    fetch(`http://test.test/Consignment/GetConsignments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    })
    .then(req => req.json())
    .then((res) => {
      if (typeof res.consignments !== "undefined") {
      this.setState({
        consignments: res.consignments,
      });}
    });
  }

  create = () => {
    let consignment = this.state;
    let token = localStorage.getItem('token');
    fetch(`http://test.test/Consignment/CreateConsignment`, {
      method: 'POST',
      headers: {
        'Authorization': `${token}`,
      },
      body: JSON.stringify({
        description: consignment.description,
        weight: consignment.weight,
      }),
    })
    .then((res) => res.json())
    .then((res) => {
      this.setState({
        created: res.created,
        consignments: [...this.state.consignments, res.consignment],
      });
    });
  }

  addContainer = e => {
    this.setState({
      containers: [...this.state.containers, e.target.value],
    });
  }

  setDescription = e => {
    this.setState({
      description: e.target.value,
    });
  }

  setWeight = e => {
    this.setState({
      weight: Number(e.target.value),
    });
  }

  render() {
    const { consignments, } = this.state;
    return (
      <div className='consignment-screen'>
        <div className='consignment-form container'>
          <br />
          <div className='form-group'>
            <textarea onChange={this.setDescription} className='form-control' placeholder='Description'></textarea>
          </div>
          <div className='form-group'>
            <input onChange={this.setWeight} type='number' placeholder='Weight' className='form-control' />
          </div>
          <div className='form-control'>
            Add containers...
          </div>
          <br />
          <button onClick={this.create} className='btn btn-primary'>Create</button>
          <br />
          <hr />
        </div>
        {(consignments && consignments.length > 0
          ? <div className='consignment-list'>
              <h2>Consignments</h2>
              {consignments.map((item) => (
                <div key={item.id}>
                  <p>Vessel id: {item.vessel_id}</p>
                  <p>Consignment id: {item.id}</p>
                  <p>Description: {item.description}</p>
                  <p>Weight: {item.weight}</p>
                  <hr />
                </div>
              ))}
            </div>
          : false)}
      </div>
    );
  }
}

export default CreateConsignment;
