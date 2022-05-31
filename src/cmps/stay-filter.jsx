import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

var $ = require("jquery");

export const StayFilter = ({ labelChange, onOpenModal }) => {
    const [selectedFilter, setSelectedFilter] = useState('All')


    const onLabelChange = (value) => {
        setSelectedFilter(value)
        labelChange(value)
    }
 
 
    let className = ''
    return <section className="stay-filter">

        <div className="labels-container">
            {
                (className = (selectedFilter === 'All') ? 'btn-label selected' : 'btn-label') &&
                <button onClick={() => { onLabelChange("All") }} className={className}>
                    <img src={require(`../assets/icons/allHomes.jpg`)} alt="" />
                    <div>All Homes</div>
                </button>
            }

            {
                (className = (selectedFilter === 'Design') ? 'btn-label selected' : 'btn-label') &&
                <button onClick={() => { onLabelChange("Design") }} className={className} >
                    <img src={require(`../assets/icons/design.jpg`)} alt="" />
                    <div>Design</div>
                </button>}
            {
                (className = (selectedFilter === 'Beach') ? 'btn-label selected' : 'btn-label') &&
                <button onClick={() => { onLabelChange("Beach") }} className={className}>
                    <img src={require(`../assets/icons/beach.jpg`)} alt="" />
                    <div>Beach</div>
                </button>}
            {
                (className = (selectedFilter === 'Amazing pools') ? 'btn-label selected' : 'btn-label') &&
                <button onClick={() => { onLabelChange("Amazing pools") }} className={className}  >
                    <img src={require(`../assets/icons/pools.jpg`)} alt="" />
                    <div>Amazing pools</div>
                </button>}
            {
                (className = (selectedFilter === 'Cabins') ? 'btn-label selected' : 'btn-label') &&
                <button onClick={() => { onLabelChange("Cabins") }} className={className} >
                    <img src={require(`../assets/icons/cabins.jpg`)} alt="" />
                    <div>Cabins</div>
                </button>}
            {
                (className = (selectedFilter === 'OMG!') ? 'btn-label selected' : 'btn-label') &&
                <button onClick={() => { onLabelChange("OMG!") }} className={className}>
                    <img src={require(`../assets/icons/omg.jpg`)} alt="" />
                    <div>OMG!</div>
                </button>}
            {
                (className = (selectedFilter === 'Camping') ? 'btn-label selected' : 'btn-label') &&
                <button onClick={() => { onLabelChange("Camping") }} className={className} >
                    <img src={require(`../assets/icons/camping.jpg`)} alt="" />
                    <div>Camping</div>
                </button>}
            {
                (className = (selectedFilter === 'Islands') ? 'btn-label selected' : 'btn-label') &&
                <button onClick={() => { onLabelChange("Islands") }} className={className} >
                    <img src={require(`../assets/icons/Islands.jpg`)} alt="" />
                    <div>Islands</div>
                </button>}
            {
                (className = (selectedFilter === 'Tiny homes') ? 'btn-label selected' : 'btn-label') &&
                <button onClick={() => { onLabelChange("Tiny homes") }} className={className} >
                    <img src={require(`../assets/icons/Tiny homes.jpg`)} alt="" />
                    <div>Tiny homes</div>
                </button>}
            {
                (className = (selectedFilter === 'Lakefront') ? 'btn-label selected' : 'btn-label') &&
                <button onClick={() => { onLabelChange("Lakefront") }} className={className} >
                    <img src={require(`../assets/icons/Lakefront.jpg`)} alt="" />
                    <div>Lakefront</div>
                </button>}

            {/* {
                (className = (selectedFilter === 'Arctic') ? 'btn-label selected' : 'btn-label') &&
                <button onClick={() => { onLabelChange("Arctic") }} className={className} >
                    <img src={require(`../assets/icons/Arctic.jpg`)} alt="" />
                    <div>Arctic</div>
                </button>} */}

        </div>
        <div>
            <button className="btn-filters" onClick={onOpenModal}>
                <span ><svg className="icon-container" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path></svg>
                </span>
                <span>Filters</span>

            </button>
        </div>
    </section >
}