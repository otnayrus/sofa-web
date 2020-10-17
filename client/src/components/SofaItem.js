import React from 'react';
import API from '../API';

class SofaItem extends React.Component {
  state = {
    sofa: {
      name: '',
      price: 0,
      dimension: {
        length: 0,
        width: 0,
        height: 0,
      },
      colors: [],
      material: '',
      image: '',
    },
  };

  componentDidMount() {
    this.fetchItem(JSON.parse(localStorage.getItem('VIEWED_SOFAS')) || []);
  }

  fetchItem = (param) => {
    // fetch a sofa from the api
    API.fetchSofa(param)
      .then((res) => {
        // set the currently viewed sofa attributes
        this.setState({ sofa: res.data.data });

        // set the viewed sofa list on the client local storage
        const viewedSofas = res.data.viewedSofas;
        localStorage.setItem('VIEWED_SOFAS', JSON.stringify(viewedSofas));
      })
      .catch((err) => console.log(err));
  };

  render() {
    const sofa = this.state.sofa;
    const colors = sofa.colors.map((color) => (
      <li key={color.toString()}> {color}</li>
    ));

    return (
      <>
        <img
          src={sofa.image}
          alt="you gonna love this sofa"
          style={{ maxWidth: '70%' }}
        />
        <h2>{sofa.name}</h2>
        <h5>
          Dimension: {sofa.dimension.length} x {sofa.dimension.width} x{' '}
          {sofa.dimension.height}
        </h5>
        <h5>Material: {sofa.material}</h5>
        <h5>Price: {sofa.price}</h5>
        <h5>Available colors:</h5>
        <ul>{colors}</ul>
      </>
    );
  }
}

export default SofaItem;
