import React, { Component } from "react";
import "./Collection.css";

import { Link } from "react-router-dom";

import { LoaderIcon } from "../../assets/assets";

class Collection extends Component {
  state = {
    id: "",
    head: "",
    year: "2017",
    collection: [],
    isLoading: true,

    notFound: false,
  };

  async componentDidMount() {
    // get url

    const {
      match: { params },
    } = this.props;

    await this.setState({ id: params.group });

    this.splitArrangeID(params.group);

    const collectionUrl = `${process.env.REACT_APP_API}Collections/${this.state.id}/${this.state.year}.json`;
    try {
      const response = await fetch(collectionUrl);
      const data = await response.json();

      await this.setState({ collection: data, isLoading: false });
    } catch (e) {
      this.setState({
        notFound: true,
      });
    }
  }

  // Modify ID for read purpose

  splitArrangeID = (id) => {
    const group = id.split("-");

    let group_one = "";
    let group_two = "";

    const group_one_split = group[0].split("_");

    group_one = this.getType(group_one_split[0]);

    for (let i = 0; i < group_one_split.length; i++) {
      group_one += group_one_split[i] + " ";
    }

    if (group.length === 2) {
      const group_two_split = group[1].split("_");
      let group_two_old = "";

      for (let i = 0; i < group_two_split.length; i++) {
        group_two_old += group_two_split[i] + " ";
      }

      group_two = group_two_old.replace("1", "I");
      group_two = group_two.replace("2", "II");
    }

    this.setState({
      head: (" " + group_one + group_two).toUpperCase(),
    });
  };

  // get Type of Group

  getType = (group) => {
    if (
      group.includes("cgl") ||
      group.includes("chsl") ||
      group.includes("mts")
    )
      return "SSC ";
    else {
      return "RAILWAY ";
    }
  };

  // Get Collection from Json

  getCollectionAPI = async (year) => {
    this.setState({ isLoading: true });

    const localY = year.target.value;
    const collectionUrl =
      process.env.REACT_APP_API + `Collections/${this.state.id}/${localY}.json`;

    try {
      const response = await fetch(collectionUrl);
      const data = await response.json();

      await this.setState({
        year: localY,
        collection: data,
        isLoading: false,
      });
    } catch (e) {
      this.setState({
        notFound: true,
      });
    }
  };

  render() {
    // create Collection

    const cTestCreater = this.state.collection.map((data, index) => {
      return (
        <Link
          to={`${this.state.id}/${this.state.year}/${index + 1}`}
          key={index}
        >
          <div className="c-test">
            <div>
              <h4>{`Set ${index + 1}`}</h4>
              <p>{`•\u00a0 Held On ${data[0]}`}</p>
              <p>{`•\u00a0 ${data[1]} Shift`}</p>
            </div>
            <div>
              {data[2].split(",").map((spanData, spanIndex) => {
                return <span key={spanIndex}>{spanData}</span>;
              })}
            </div>
          </div>
        </Link>
      );
    });

    return (
      <div className="Collection">
        <header>
          <span>{this.state.head}</span>

          <select
            className="filter-year"
            onChange={this.getCollectionAPI}
            value={"2017"}
          >
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
          </select>
        </header>

        {!this.state.isLoading ? (
          <div className="c-test-wrapper">{cTestCreater}</div>
        ) : (
          <div className="coll-test-loader">
            {this.state.notFound ? (
              <div>
                {window.innerWidth < 768 ? (
                  <>
                    <p>Currently not available</p>
                    <p>Please change the year above</p>
                  </>
                ) : (
                  <p>Currently not available, please change the year above</p>
                )}
              </div>
            ) : (
              <img src={LoaderIcon} alt="Loading" />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Collection;
