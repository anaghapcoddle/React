import { Link } from 'react-router-dom';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import Layout from '../components/Layout';
import { RootState } from '../redux/state/store';
import { getData } from '../utils/apiUtils';
import { addOrder } from '../redux/state/previousOrdersSlice';
import { setUserDetails } from '../redux/state/userSlice';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUserDetails() {
      const userDetailsResult = await getData(
        `${process.env.REACT_APP_API_URL}/auth/getuserdetails`
      );
      const userDetails = userDetailsResult.data.user;
      dispatch(setUserDetails(userDetails));
    }
    fetchUserDetails();
  }, [dispatch]);

  const userDetails = useSelector((state: RootState) => state.user.userDetails);
  const firstName = userDetails ? userDetails.firstName : 'Guest';

  const getOrders = useCallback(async () => {
    const getOrdersResult = await getData(
      `${process.env.REACT_APP_API_URL}/orders/view`
    );
    const fetchedOrders = getOrdersResult.data.orders;
    dispatch(addOrder(fetchedOrders));
  }, [dispatch]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <Layout>
      <div className="home">
        <div className="home-content container">
          <div className="welcome-text-container">
            <span className="homepage-text">Welcome {firstName}!</span>
          </div>
          <div className="select-table-text-container">
            <span className="homepage-text">Select table</span>
          </div>
          <div className="table-container">
            <Link to="/table/1" className="table table1">
              01
            </Link>
            <Link to="/table/2" className="table table1">
              02
            </Link>
            <Link to="/table/3" className="table table1">
              03
            </Link>
            <Link to="/table/4" className="table table1">
              04
            </Link>
            <Link to="/table/5" className="table table1">
              05
            </Link>
            <Link to="/table/6" className="table table1">
              06
            </Link>
            <Link to="/table/7" className="table table1">
              07
            </Link>
            <Link to="/table/8" className="table table1">
              08
            </Link>
            <Link to="/table/9" className="table table1">
              09
            </Link>
            <Link to="/table/10" className="table table1">
              10
            </Link>
            <Link to="/table/11" className="table table1">
              11
            </Link>
            <Link to="/table/12" className="table table1">
              12
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
