import LayoutAdmin from "@/components/layout/LayoutAdmin";
import { HiPencilAlt } from "react-icons/hi";
import { HiSearch } from "react-icons/hi";
import Link from "next/link";
//import RemoveBtn from "./RemoveBtn";

const getMainTypes = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/vehicleMainType", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch main types");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading main types: ", error);
    return { mainTypes: [] }; // Return an empty array if there's an error
  }
};

export default async function MyInventory() {
  const { mainTypes } = await getMainTypes();

  if (!mainTypes || mainTypes.length === 0) {
    return <p>No main types available.</p>;
  }

  return (
    <LayoutAdmin headerStyle={1} footerStyle={1}>
      <div className="row">
        <div className="col-md-6">
          <h4 className="title-dashboard">Vehicle Main Types</h4>
        </div>
        <div className="col-md-6 sellec-list-db">
          <div className="group-select">
            <select className="nice-select">
              <option data-value className="option selected">Recently Added</option>
              <option data-value="Public" className="option">Public</option>
              <option data-value="Pending" className="option">Pending</option>
            </select>
          </div>
        </div>
      </div>
      <div className="show-dashboard">
        <span className="btn-show-dashboard">
          <i className="icon-th-list" />
          Show Dashboard
        </span>
      </div>
      <div className="table-listing-inventory">
        <table className="listing-inventory">
          <tbody>
            {mainTypes.map((t) => (
              <tr key={t._id}>
                <td>
                  <div className="tfcl-listing-listing">
                    <div className="features-images">
                      <ul className="controller2">
                        <li>
                          <a href="#" className="btn-action">
                            <i className="icon-heart-1-1" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="btn-action">
                            <i className="icon-shuffle-2-11" />
                          </a>
                        </li>
                      </ul>
                      <a className="thumb" title href="#">
                        <img src="./assets/images/car-list/list1.jpg" alt title />
                      </a>
                    </div>
                    <div className="listing-summary">
                      <div className="mypt-brand">Brand: {t.name}</div>
                      <h6 className="listing-title">
                        <a title href="#">{t.name}</a>
                      </h6>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="list-wrapper">
                    <p className="status-publish">Approved</p>
                  </div>
                </td>
                <td>
                  <div className="list-wrapper">
                    <p>{t.description || "No description"}</p>
                    <b>Description</b>
                  </div>
                </td>
                <td>
                  <div className="list-wrapper">
                    {/* <RemoveBtn id={t._id} /> */}
                    <Link href={`/ViewMainType/${t._id}`}>
                      <HiSearch size={24} />
                    </Link>
                    <Link href={`/editMainTypeName/${t._id}`}>
                      <HiPencilAlt size={24} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="tf-pagination mt-60">
          <a className="prev page-numbers" href="#">
            <i className="icon-3" />
          </a>
          <a className="page-numbers" href="#">1</a>
          <a className="page-numbers active" href="#">2</a>
          <a className="page-numbers" href="#">3</a>
          <a className="page-numbers" href="#">...</a>
          <a className="next page-numbers" href="#">
            <i className="icon--1" />
          </a>
        </div>
      </div>
    </LayoutAdmin>
  );
}
