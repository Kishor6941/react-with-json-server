import type { PaginationPayload } from "../../models/user.Model"

const Pagination = (props:PaginationPayload) => {
    console.log(props)
    return (
        <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item"><button className="page-link">Previous</button></li>
    <li className="page-item"><button className="page-link">1</button></li>
    <li className="page-item"><button className="page-link">2</button></li>
    <li className="page-item"><button className="page-link">3</button></li>
    <li className="page-item"><button className="page-link">Next</button></li>
  </ul>
</nav>
    )
}

export default Pagination