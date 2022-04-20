import { useParams } from 'react-router-dom'
import { FetchPage } from '../hooks/FetchPage'

// projects means resource

export default function Resource() {
    const { id } = useParams()
    const { error, rpage } = FetchPage('resources', id)

    if (error) {
        return <div> {error} </div>
    }

    if(!rpage) {
        return <div> Loading </div>
    }

    return(
        <div className="resource-page">
            <h1>{rpage.title}</h1>
            <p>{rpage.desc}</p>
            <a href={rpage.reference}> site </a>
        </div>
    )
}