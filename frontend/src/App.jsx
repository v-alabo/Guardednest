import Home from './Home'
import About from './About';
import Services from './Services';
import Login from './Login';
import Signup from './Signup'
import Contact from './Contact';
import Dash from './Dash';
import Withdrawals from './Withdrawals';
import Select from './Select';
import Bank from './Bank';
import Crypto from './Crypto';
import Paypal from './Paypal';
import Cashapp from './Cashapp';
import Fund from './Fund';
import Policy from './Policy';
import Faq from './Faq'
import Terms from './Terms'
import Payment from './Payment'
import Confirmation from './Confirmation'
import Settings from './Settings'
import Photo from './Photo'
import Transactions from './Transactions'
import Admin from './Admin/Admin'
import UserCard from './Admin/UserCard'
import AdminTransaction from './Admin/AdminTransaction';
import {BrowserRouter, Routes, Route} from 'react-router-dom'




function App() {

    return(
      <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/services' element={<Services />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/policy' element={<Policy />}></Route>
        <Route path='/terms' element={<Terms />}></Route>
        <Route path='/faq' element={<Faq />}></Route>
        <Route path='/user' element={<Dash />}></Route>
        <Route path='/user/fund' element={<Fund />}></Route>
        <Route path='/user/fund/payment' element={<Payment />}></Route>
        <Route path='/user/fund/payment/confirmation' element={<Confirmation />}></Route>
        <Route path='/user/withdrawals' element={<Withdrawals />}></Route>
        <Route path='/user/withdrawals/select' element={<Select />}></Route>
        <Route path='/user/withdrawals/select/bank' element={<Bank />}></Route>
        <Route path='/user/withdrawals/select/crypto' element={<Crypto />}></Route>
        <Route path='/user/withdrawals/select/paypal' element={<Paypal />}></Route>
        <Route path='/user/withdrawals/select/cashapp' element={<Cashapp />}></Route>
        <Route path='/user/settings' element={<Settings />}></Route>
        <Route path='/user/settings/photo' element={<Photo />}></Route>
        <Route path='/user/transactions' element={<Transactions />}></Route>
        <Route path='/admin' element={<Admin />}></Route>
        <Route path='/admin/usercard/:username' element={<UserCard />}></Route>
        <Route path='/admin/transactions/:username' element={<AdminTransaction />}></Route>

      </Routes>
      </BrowserRouter>
    );
}

export default App