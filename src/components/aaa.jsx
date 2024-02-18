{
    selectedTeam && (
        <div className="my-4">
            <h2 className="text-xl font-bold mb-2">Edit Team</h2>
            <form onSubmit={handleFormSubmit} className="flex flex-col">
                <label className="mb-2">
                    Team Name:
                    <input
                        type="text"
                        name="name"
                        value={editedTeam.name}
                        onChange={handleInputChange}
                        className="px-4 py-2 rounded border"
                    />
                </label>
                <label className="mb-2">
                    Province:
                    <input
                        type="text"
                        name="province"
                        value={editedTeam.province}
                        onChange={handleInputChange}
                        className="px-4 py-2 rounded border"
                    />
                </label>
                <label className="mb-2">
                    Color:
                    <input
                        type="text"
                        name="color"
                        value={editedTeam.color}
                        onChange={handleInputChange}
                        className="px-4 py-2 rounded border"
                    />
                </label>
                <label className="mb-2">
                    Shirt Data:
                    <input
                        type="text"
                        name="shirt_data"
                        value={editedTeam.shirt_data}
                        onChange={handleInputChange}
                        className="px-4 py-2 rounded border"
                    />
                </label>
                <label className="mb-2">
                    Image URL:
                    <input
                        type="text"
                        name="image"
                        value={editedTeam.image}
                        onChange={handleInputChange}
                        className="px-4 py-2 rounded border"
                    />
                </label>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                    Save Changes
                </button>
            </form>
        </div>
    )
}