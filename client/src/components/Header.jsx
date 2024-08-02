import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import icon_g from '../assets/icon-g.png'
import { useSelector } from 'react-redux';
import { TextInput } from 'flowbite-react';
export default function Header() {
    const { currentUser } = useSelector(state => state.user)
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex flex-nowrap'>
         <img src={icon_g} className='w-[190px] h-[50px] mt-3' alt="" />
        <div className='flex gap-0 sm:gap-52 justify-between items-center max-w-6xl mx-auto p-3'>
            {/* <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-slate-500'>Mekelle</span>
                <span className='text-slate-700'>Estate</span>
            </h1>
            </Link> */}
            <form>
            <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        //   value={searchTerm}
        //   onChange={(e) => setSearchTerm(e.target.value)}
        />
            </form>
            <ul className='flex gap-4'>
                <Link to='/'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                </Link>
                <Link to='/about'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                </Link>
                <Link to='/profile'>
                {currentUser ? (<img className='rounded-full h-8 w-8 object-cover' src={currentUser.avatar} alt='profile' />) : (
                    <li className='text-slate-700 hover:underline'>Sign in</li>
                )}
                </Link>            
            </ul>
        </div>
        </div>
    </header>
  )
}
