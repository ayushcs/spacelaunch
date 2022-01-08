import React from 'react'

export default function Card(props) {
    const {flightNumber, missionid, missionname, launch_year, success, landing, img} = props;
    return (
        <>
            <img src={img} className="card__image" />
            <div className="card__content">
                <h4 className="card__title">{missionname} <span>#</span>{flightNumber} </h4>
                <div className="card__missionId">
                    <h4 className="card__infoHeading">Mission Id:</h4>
                    <ul className="mission__list">
                        {
                            missionid && missionid.length ?
                            missionid.map((item, index) => {
                                return (
                                    <li key={index}>{item}</li>
                                )
                            }) :
                            <li>No Data</li>
                        }
                    </ul>
                </div>
                <div className="card__launchYear">
                    <h4 className="card__infoHeading">Launch Year:<span className="launch_year"> {launch_year}</span></h4>
                </div>
                <table className="card__successfulLaunch">
                    <tbody>
                        <tr>
                            <td className="card__infoHeading">
                                <h4 className="card__infoTitle">Successful Launch: </h4>
                            </td>
                            <td>
                                <h4 className="launch_success"> {String(success)}</h4>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className="card__successfulLaunch">
                    <tbody>
                        <tr>
                            <td className="card__infoHeading">
                                <h4 className="card__infoTitle">Successful Landing: </h4>
                            </td>
                            <td>
                                <h4 className="launch_success"> {String(landing)}</h4>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
