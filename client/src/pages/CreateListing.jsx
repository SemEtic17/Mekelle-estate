import { Button, Checkbox, FileInput, Label, Textarea, TextInput } from 'flowbite-react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className='flex flex-col gap-4 flex-1'>
        <TextInput
          type="text"
          id="name"
          placeholder="Name"
          className='p-3'
          maxLength='62' minLength='10' required
        />
        <Textarea
          type="text"
          id="description"
          placeholder="Description"
          className='p-3 ml-3 w-[24rem]'
          required
        />
        <TextInput
          type="text"
          id="address"
          placeholder="Address"
          className='p-3'
          required
        />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <Checkbox id="sale" />
              <Label htmlFor="sale">Sell</Label>
            </div>
            <div className='flex gap-2'>
              <Checkbox id="rent" />
              <Label htmlFor="rent">Rent</Label>
            </div>
            <div className='flex gap-2'>
              <Checkbox id="parking" />
              <Label htmlFor="parking">Parking spot</Label>
            </div>
            <div className='flex gap-2'>
              <Checkbox id="furnished" />
              <Label htmlFor="furnished">Furnished</Label>
            </div>
            <div className='flex gap-2'>
              <Checkbox id="offer" />
              <Label htmlFor="offer">Offer</Label>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input type="number" id='bedrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg w-[60px] h-10' />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input type="number" id='bathrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg w-[60px] h-10' />
              <p>Baths</p>
            </div>
            <div className='flex items-center gap-2'>
              <input type="number" id='regularPrice' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg w-[60px] h-10' />
              <div className='flex flex-col items-center'>
                <p>Regular price</p>
                <span className='text-xs'>($ / month)</span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <input type="number" id='discountPrice' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg w-[60px] h-10' />
              <div className='flex flex-col items-center'>
                <p>Discounted price</p>
                <span className='text-xs'>($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>Images:
            <span className='font-normal text-gary-600 ml-2'>The first image will be the cover (max 6)</span>
          </p>
          <div className='flex flex-row'>
              <FileInput id="file" className='p-3 w-full' accept='image/*' multiple />
              <Button className='disabled:opacity-80 h-[42px] mt-3' gradientDuoTone="greenToBlue" outline >Upload</Button>
          </div>
          <Button
          gradientDuoTone="greenToBlue"
          outline
        >
        Create Listing
        </Button>
        </div>
        
      </form>
    </main>
  )
}
