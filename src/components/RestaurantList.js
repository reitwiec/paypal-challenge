import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components';
import RestaurantItem from './RestaurantItem';
const fuzzysort = require('fuzzysort')
const dropdownward = keyframes`
	0%{
		height:0px;
	}
	100%{
		height: 250px;
	}
`;
const Filters = styled.div`
    display:flex;

`;

const Container = styled.div`

padding:50px;

.wrapper {
    position: relative;
    .searchBar {
			all: unset;
			width: 60%;
			padding: 15px;
			padding-left: 50px;
			background: #ffffff;
			color: #a6adc6;
			font-size: 16px;
			font-weight: 500;
			-webkit-transition: width 0.7s ease-out;
			transition: width 0.7s ease-in-out;
            border-bottom: 2px solid #E9EBF0;
			:focus {
				color: #1f2438;
				border-bottom: 2px solid #2997d8;
			}
		}
    button{
            all: unset;
			position: absolute;
			cursor: pointer;
			left: 15px;
			top: 50%;
			transform: translateY(-50%);
			height: 22px;
    }
}

.dropdown {
		position: relative;
		margin-top: 40px;
		margin-bottom: 30px;
        margin-right:50px;
		.dropbtn {
			display: flex;
			padding: 10px;
			width: 160px;
			background: #fff;
            border: 2px solid #DCDFE8;
			border-radius: 7px;
			color: #83858E;
            font-weight:600;
			justify-content: space-between;
			user-select: none;
			:hover {
				cursor: pointer;
			}
			svg {
				align-self: center;
			}
		}
		.dropdown-content {
			display: none;
			position: absolute;
			max-height: 200px;
			top: 50px;
			overflow-y: scroll;
			background-color: #fff;
			min-width: 160px;
			box-shadow: 0px 8px 13px #f2eeff;
			border-radius: 10px;
			z-index: 1;
			> div {
				color: #1f2438;
				padding: 12px 16px;
				display: block;
				:hover {
					cursor: pointer;
					background-color: #2997d8;
					color: #fff;
				}
			}
			.blocked {
				opacity: 0.6;
				:hover {
					cursor: default;
					background-color: white;
					color: #1f2438;
				}
			}
		}

		.show {
			display: block;
			animation: ${dropdownward} 0.3s linear;
		}
	}
`;
export default function RestaurantList(props) {
    const [selectedCuisine, setCuisine] = useState('All Types of cuisine');
    const [availableRestaurants, setAvailableRestaurants] = useState([]);
    const [appliedSort, setAppliedSort] = useState('None');
    const [searchValue, setSearchValue] = useState('');

    const toggleDropdown = (e) => {
        const dropdwn = document.querySelector('#toggleId');
        dropdwn.classList.toggle('show');
    };
    const toggleDropdown2 = (e) => {
        const dropdwn = document.querySelector('#toggleId2');
        dropdwn.classList.toggle('show');
    };
    const handleFilterChange = (val) => {
        const dropdwn = document.querySelector('#toggleId');
        dropdwn.classList.toggle('show');
        setCuisine(val);
    };

    const handleSortChange = (val, key) => {

        const dropdwn = document.querySelector('#toggleId2');

        setAppliedSort(val);
        if (key) {
            dropdwn.classList.toggle('show');
        }
        var rests = props.restData;
        if (val === 'None') {
        } else {
            rests.sort((a, b) => {
                console.log(val);
                return -parseFloat(a[val]) + parseFloat(b[val]);
            })
        }
        setAvailableRestaurants(rests)


    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    }

    const sorts = [
        'None',
        'Aggregate rating',
        'Votes',
        'Average Cost for two'
    ]

    useEffect(() => {
        setAvailableRestaurants(props.restData);
    }, [props.restData])

    return (
        <Container>
            <div className="wrapper">
                <button>
                    <svg
                        width="22"
                        height="21"
                        viewBox="0 0 22 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.8533 14.7269C17.9525 13.1996 18.6 11.3254 18.6 9.3C18.6 4.16375 14.4362 0 9.3 0C4.16375 0 0 4.16375 0 9.3C0 14.4362 4.16375 18.6 9.3 18.6C11.5814 18.6 13.6709 17.7785 15.2889 16.4153L19.4868 20.6132C19.9359 21.0623 20.6641 21.0623 21.1132 20.6132C21.5623 20.1641 21.5623 19.4359 21.1132 18.9868L16.8533 14.7269ZM14.5573 13.9219C15.6421 12.689 16.3 11.0713 16.3 9.3C16.3 5.43401 13.166 2.3 9.3 2.3C5.43401 2.3 2.3 5.43401 2.3 9.3C2.3 13.166 5.43401 16.3 9.3 16.3C11.29 16.3 13.086 15.4696 14.3605 14.1365C14.3977 14.084 14.4398 14.0339 14.4868 13.9868C14.5096 13.964 14.5331 13.9424 14.5573 13.9219Z"
                            fill="#2997d8"
                        />
                    </svg>
                </button>
                <input
                    className="searchBar"
                    type="text"
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Search restaurants using...."
                />
            </div>
            <Filters>
                <div className="dropdown">
                    <div onClick={toggleDropdown} className="dropbtn btntrigger">
                        <span className="btntrigger">{selectedCuisine}</span>
                    </div>
                    <div className="dropdown-content" id="toggleId">
                        {props.cuisines.map((branch, i) => {
                            return (
                                <div
                                    onClick={() => { handleFilterChange(branch) }}
                                    key={i}
                                >
                                    {branch}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="dropdown">
                    <div onClick={toggleDropdown2} className="dropbtn btntrigger">
                        <span className="btntrigger">{appliedSort}</span>
                    </div>
                    <div className="dropdown-content" id="toggleId2">

                        {sorts.map((branch, i) => {
                            return (
                                <div
                                    onClick={() => { handleSortChange(branch, true) }}
                                    key={i}
                                >
                                    {branch}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Filters>

            {searchValue === '' ? (availableRestaurants.map((restaurant, i) => {
                var cus = restaurant.Cuisines.split(",").map(item => item.trim());
                var status = cus.includes(selectedCuisine);
                if (selectedCuisine === 'All Types of cuisine') {
                    return (
                        <RestaurantItem name={restaurant["Restaurant Name"]} cuisines={cus} avg={restaurant["Average Cost for two"]} currency={restaurant["Currency"]} booking={restaurant["Has Table booking"]} online={restaurant["Has Online delivery"]} agg={restaurant["Aggregate rating"]} rcolor={restaurant["Rating color"]} rtext={restaurant["Rating text"]} votes={restaurant["Votes"]} />
                    )
                } else {
                    if (status) {
                        return (
                            <RestaurantItem name={restaurant["Restaurant Name"]} cuisines={cus} avg={restaurant["Average Cost for two"]} currency={restaurant["Currency"]} booking={restaurant["Has Table booking"]} online={restaurant["Has Online delivery"]} agg={restaurant["Aggregate rating"]} rcolor={restaurant["Rating color"]} rtext={restaurant["Rating text"]} votes={restaurant["Votes"]} />
                        )
                    }
                }

            })) : fuzzysort.go(searchValue, availableRestaurants, { key: 'Restaurant Name' }).map(rest => {
                return rest.obj;
            }).map((restaurant, i) => {
                var cus = restaurant.Cuisines.split(",").map(item => item.trim());
                var status = cus.includes(selectedCuisine);
                if (selectedCuisine === 'All Types of cuisine') {
                    return (
                        <RestaurantItem name={restaurant["Restaurant Name"]} cuisines={cus} avg={restaurant["Average Cost for two"]} currency={restaurant["Currency"]} booking={restaurant["Has Table booking"]} online={restaurant["Has Online delivery"]} agg={restaurant["Aggregate rating"]} rcolor={restaurant["Rating color"]} rtext={restaurant["Rating text"]} votes={restaurant["Votes"]} />
                    )
                } else {
                    if (status) {
                        return (
                            <RestaurantItem name={restaurant["Restaurant Name"]} cuisines={cus} avg={restaurant["Average Cost for two"]} currency={restaurant["Currency"]} booking={restaurant["Has Table booking"]} online={restaurant["Has Online delivery"]} agg={restaurant["Aggregate rating"]} rcolor={restaurant["Rating color"]} rtext={restaurant["Rating text"]} votes={restaurant["Votes"]} />
                        )
                    }
                }

            })
            }
        </Container>
    )
}
