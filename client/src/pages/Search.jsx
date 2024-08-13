import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8">
          <div className="flex   items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              //   value={sidebarData.searchTerm}
              //   onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Label htmlFor="remember">Type:</Label>
            <div className="flex gap-2 items-center">
              <Checkbox id="all" />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox id="sale" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox id="offer" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Label htmlFor="remember">Amenities:</Label>
            <div className="flex gap-2 items-center">
              <Checkbox id="Parking" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox id="furnished" />
              <span>furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <Select id="sort_order">
              <option value="">Price high to low</option>
              <option value="">Price low to high</option>
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="purpleToPink">
            Search
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 ">
          Listing results:
        </h1>
        {/* <div className='p-7 flex flex-wrap gap-4'>
        {!loading && posts.length === 0 && (
          <p className='text-xl text-gray-500'>No posts found.</p>
        )}
        {loading && <p className='text-xl text-gray-500'>Loading...</p>}
        {!loading &&
          posts &&
          posts.map((post) => <PostCard key={post._id} post={post} />)}
        {showMore && (
          <button
            onClick={handleShowMore}
            className='text-teal-500 text-lg hover:underline p-7 w-full'
          >
            Show More
          </button>
        )}
      </div> */}
      </div>
    </div>
  );
}
