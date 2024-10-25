import Home from './Home/Home'
import About from './Home/About';
import Services from './Home/Services';
import Login from './Home/Login';
import Signup from './Home/Signup'
import Contact from './Home/Contact';
import Dash from './User/Dash';
import Withdrawals from './User/Withdrawals';
import Select from './User/Select';
import Bank from './User/Bank';
import Crypto from './User/Crypto';
import Paypal from './User/Paypal';
import Cashapp from './User/Cashapp';
import Fund from './User/Fund';
import Policy from './Home/Policy';
import Faq from './Home/Faq'
import Terms from './Home/Terms'
import Payment from './User/Payment'
import Confirmation from './User/Confirmation'
import Settings from './User/Settings'
import Transactions from './User/Transactions'
import Admin from './Admin/Admin'
import UserDetails from './Admin/UserDetails';
import AdminTransaction from './Admin/AdminTransaction'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Human from './Home/Human';




function App() {

    return(
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/services' element={<Services />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/policy' element={<Policy />}></Route>
        <Route path='/terms' element={<Terms />}></Route>
        <Route path='/faq' element={<Faq />}></Route>
        <Route path='/humanrights' element={<Human/>}></Route>
        <Route path='/user/:username' element={<Dash />}></Route>
        <Route path='/user/:username/fund' element={<Fund />}></Route>
        <Route path="/user/:username/fund/payment" element={<Payment />}></Route>
        <Route path='/user/fund/payment/confirmation' element={<Confirmation />}></Route>
        <Route path='/user/withdrawals' element={<Withdrawals />}></Route>
        <Route path='/user/withdrawals/select' element={<Select />}></Route>
        <Route path='/user/withdrawals/select/bank' element={<Bank />}></Route>
        <Route path='/user/withdrawals/select/crypto' element={<Crypto />}></Route>
        <Route path='/user/withdrawals/select/paypal' element={<Paypal />}></Route>
        <Route path='/user/withdrawals/select/cashapp' element={<Cashapp />}></Route>
        <Route path='/user/settings' element={<Settings />}></Route>
        <Route path='/user/transactions' element={<Transactions />}></Route>
        <Route path='/admin' element={<Admin />}></Route>
        <Route path='/admin/transactions/:username' element={<AdminTransaction />}></Route>
        <Route path='/admin/userdetails/:username' element={<UserDetails />}></Route>

      </Routes>
      </BrowserRouter>
    );
}

export default App