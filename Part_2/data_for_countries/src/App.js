import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [data, setData] = useState([])
  const [filterName, setFilterName] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setData(response.data)
    })
  }

  useEffect(hook, [])

  const handleFilterName = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <div>
      <Filter filterName={filterName} handleFilterName={handleFilterName} />
      <Countries data={data} filterName={filterName}
      setFilterName={setFilterName} />
    </div>
  )
}

export default App;
