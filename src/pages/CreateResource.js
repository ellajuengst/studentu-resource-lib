import React from 'react'

export default function CreateResource() {
  return (
    <div>CreateResource
    <h1>Resources (GET)</h1>
      <div className="inputBox">
        <h3>Add New</h3>
        <input
          type="text"
          placeholder = "Resource Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button onClick={() => addResource({title, desc, id: uuidv4() })}>
          Submit
        </button>
      </div>
      <hr />
    </div>
  )
}
