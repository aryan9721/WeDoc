/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import { PRODUCT_IMAGE_URL } from "../../common/config";
import jwt from "jsonwebtoken";
import { useToasts } from 'react-toast-notifications';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import DatePicker from 'react-datepicker'
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { useLazyQuery, useMutation } from "@apollo/react-hooks";
//import Skeleton from '@material-ui/core/Skeleton';
import {
  getPrdShoppingCart,
  deletePrdShoppingCart,
  createMstFavourites,
  updatePrdShoppingCart,
  purchaseShoppingCartAsync,
} from '../../services/graphql'

//Import Product Images
import img1 from "../../assets/images/product/img-1.png";


const productListvar = [
  {
    id: 1,
    img: img1,
    name: "Half sleeve T-shirt",
    color: "Maroon",
    price: "450",
    data_attr: 2,
    total: 900,
  },
];

const EcommerceCart = () => {
  const [productList, setproductList] = useState([productListvar]);
  const [cartDetails, setCartDetails] = useState({});
  const [startDate, setStartDate] =useState([{}]);
  const [endDate, setEndDate] = useState([{}]);
  const [vaildStartDate, setVaildStartDate] = useState(false)
  const [vaildEndDate, setVaildEndDate] = useState(false);
  const { addToast } = useToasts();
  const token = localStorage.getItem("authToken").replace(/^"|"$/g, "");
  var decodeJwt = jwt.decode(token);

  const [getCartDetails, { loading: getCartLoading, data: getCartData }] =
    useLazyQuery(getPrdShoppingCart, {
      fetchPolicy: 'network-only',
    });
  const [updateCart, { data: updateCartData }] = useMutation(
    updatePrdShoppingCart
  );
  const [shopProduct, { data: shopProductData }] = useLazyQuery(
    purchaseShoppingCartAsync
  );

  const [deleteCart, { loading: deleteCartLoading, data: deleteCartData }] =
    useMutation(deletePrdShoppingCart);
  const [createMstFavouritesList, { data: createMstFavouritesData }] =
    useMutation(createMstFavourites);

  const deletePrdShoppingCartRecord = (recordID) => {
    deleteCart({
      variables: {
        prdShoppingCart:{
          recordId: recordID,
        }
      },
    });
  };
  useEffect(() => {
    if (deleteCartData && deleteCartData.deletePrdShoppingCart) {
      //console.log(deleteCartData.deletePrdShoppingCart);
      setproductList(deleteCartData.deletePrdShoppingCart.result.prdShoppingCartDto || [])
      setCartDetails(deleteCartData.deletePrdShoppingCart.result);
      addToast('Cart Item delete Successfully', { appearance: 'success'});
        const count = localStorage.getItem("cartCount");
        localStorage.setItem("cartCount", JSON.stringify(Number(count)-1));
        document.getElementById('cartCountNumber').textContent = count
    }
  }, [deleteCartData]);
  useEffect(() => {
    if (getCartData && getCartData.getPrdShoppingCart) {

      setproductList(getCartData.getPrdShoppingCart.result.prdShoppingCartDto || [])
      setCartDetails(getCartData.getPrdShoppingCart.result);
    }
  }, [getCartData]);

  useEffect(() => {
    getCartDetails({
      variables: {
        page: 1,
        size: 2,
      },
    });
  }, [getCartDetails]);

  function countUP(id, prev_data_attr) {
    setproductList(
      productList.map((p) =>
        p.productID === id ? { ...p, quantity: prev_data_attr + 1 } : p
      )
    );
    const productData = productList.find((product) => product.productID === id);
    const date = new Date();
    const dateFormated = new Date(
      date.toISOString().split("T")[0] + "T00:00:00.000Z"
    );
    updateCart({
      variables: {
        prdShoppingCart: {
          dateCreated: dateFormated,
          productId: id,
          quantity: productData.quantity,
          recordId: productData.recordId,
          sessionId: decodeJwt.jti,
          userId: 0,
        },
      },
    });
  }
  
  function countDown(id, prev_data_attr) {
    setproductList(
      productList.map((p) =>
        p.productID === id ? { ...p, quantity: prev_data_attr - 1 } : p
      )
    );
    const productData = productList.find((product) => product.productID === id);
    console.log(productData, id);
    const date = new Date();
    const dateFormated = new Date(
      date.toISOString().split("T")[0] + "T00:00:00.000Z"
    );
    updateCart({
      variables: {
        prdShoppingCart: {
          dateCreated: dateFormated,
          productId: id,
          quantity: productData.quantity,
          recordId: productData.recordId,
          sessionId: "lftmjajx2rllpts5z3sp4i2e",
          userId: 0,
        },
      },
    });
  }
  const PurchaseProduct = () => {
    shopProduct({
   variables:{
    id: 1
   }
    })
  }

  useEffect(() => {
    if (shopProductData && shopProductData.purchaseShoppingCartAsync) {
     
      let payfastUrl = 'https://sandbox.payfast.co.za/eng/process?'
      payfastUrl += `merchant_id=${process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID}`
      payfastUrl += `&merchant_key=${process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY}`
      ;(payfastUrl += `&return_url=${process.env.NEXT_PUBLIC_ROOT_URL}/lawyers/payment/success`), // https://business.LawyersEzyFind.co.za`
        (payfastUrl += `&cancel_url=${process.env.NEXT_PUBLIC_ROOT_URL}/lawyers/payment/cancel`)
      payfastUrl += `&notify_url=${process.env.NEXT_PUBLIC_ROOT_URL}/lawyers/payment/notify`
      payfastUrl += `&m_payment_id=13184`
      payfastUrl += `&amount=${cartDetails.totalAmount.toFixed(2)}`
      payfastUrl += `&item_name=Company+9`
      payfastUrl += `&item_description=Purchased+EzyFindMobileApi.Model.MstPackage+Package`
      payfastUrl += `&subscription_type=3`
      window.location.assign(payfastUrl)
     
      
    } 
  }, [shopProductData]);

  const addWishList = (id) => {
    const date = new Date();
    const dateFormated = new Date(
      date.toISOString().split("T")[0] + "T00:00:00.000Z"
    );
    // createMstFavouritesList({variables:{
    //   mstFavourites:{
    //     companyId: null,
    //     createdBy: 0,
    //     createdDate: dateFormated,
    //     eflyerId: 2,
    //     modifiedBy: null,
    //     modifiedDate: null,
    //     mstFavouriteId: 0,
    //     productId: id,
    //     specialId: null,
    //     userId: 1017
    //   }
    // }})
    alert("Want to add wishlist this product " + id);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Cart" />
          {productList.length > 0 && (
          <Row>
           
            <Col xl="8">
              { productList.map((product, key) => (
                <Card className="border shadow-none" key={product.id}>
                  <CardBody>
                    <div className="d-flex align-items-start border-bottom pb-3">
                      <div className="flex-shrink1 me-4">
                        <img
                          src={
                            product.productImage === null
                              ? img1
                              : `${PRODUCT_IMAGE_URL}${product.productImage} `
                          }
                          alt=""
                          className="avatar-lg"
                        />
                      </div>
                      <div className="flex-grow-1 align-self-center overflow-hidden">
                        <div>
                          <h5 className="text-truncate font-size-16">
                            <Link
                              to={
                                "/ecommerce-product-detail/" + product.productID
                              }
                              className="text-dark"
                            >
                              {product.name}
                            </Link>
                          </h5>
                          <p className="mb-1">
                            Category :{" "}
                            <span className="fw-medium">
                              {product.categoryName}
                            </span>
                          </p>
                          <p>
                            Product Name :{" "}
                            <span className="fw-medium">
                              {product.productName}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="ml-2">
                        <ul className="list-inline mb-0 font-size-16">
                          <li className="list-inline-item">
                            <Link
                              to="#"
                              onClick={() =>
                                deletePrdShoppingCartRecord(product.recordID)
                              }
                              className="text-muted px-2"
                            >
                              <i className="uil uil-trash-alt"></i>
                            </Link>{" "}
                          </li>{" "}
                          <li className="list-inline-item">
                            <Link
                              to="#"
                              onClick={() => addWishList(product.productID)}
                              className="text-muted px-2"
                            >
                              <i className="uil uil-heart"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="mt-3">
                            <p className="text-muted mb-2">Price</p>
                            <h5 className="font-size-16">
                              R{product.totalPrice}.00
                            </h5>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mt-3">
                            <p className="text-muted mb-2">Quantity</p>
                            <div style={{ width: "110px" }}>
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                  <Button
                                    color="primary"
                                    onClick={() => {
                                      countUP(
                                        product.productID,
                                        product.quantity
                                      );
                                    }}
                                  >
                                    +
                                  </Button>
                                </InputGroupAddon>
                                <Input
                                  type="text"
                                  value={product.quantity}
                                  name="demo_vertical"
                                  readOnly
                                />
                                <InputGroupAddon addonType="append">
                                  <Button
                                    color="primary"
                                    onClick={() => {
                                      countDown(
                                        product.productID,
                                        product.quantity
                                      );
                                    }}
                                  >
                                    -
                                  </Button>
                                </InputGroupAddon>
                              </InputGroup>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mt-3">
                          <><Col>
                                        <DatePicker
                                          placeholderText="Start Date"
                                          selected={startDate.find((item) => item.index === product.productID
                                          )?.date}
                                          onChange={(date) => {
                                            setVaildStartDate(false);
                                            setStartDate([...startDate, { index: product.productID, date: date }]);
                                          } }
                                          popperClassName="hire-date-range"
                                          popperPlacement="top-end"
                                          minDate={new Date()}
                                          maxDate={endDate} />
                                        {vaildStartDate && (
                                          <span className="text-primary text-vaild">
                                            Enter Start Date
                                          </span>
                                        )}`
                                      </Col><Col>
                                          <DatePicker
                                            placeholderText="End Date"
                                            selected={endDate.find((item) => item.index === product.productID
                                            )?.date}
                                            onChange={(date) => {
                                              setVaildEndDate(false);
                                              setEndDate([...endDate, { index: product.productID, date: date }]);
                                            } }
                                            popperClassName="hire-date-range"
                                            popperPlacement="top-end"
                                            minDate={startDate.find((item) => item.index === key
                                            )?.date || new Date()} />
                                          {vaildEndDate && (
                                            <span className="text-primary text-vaild">
                                              Enter End Date
                                            </span>
                                          )}
                                        </Col></>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mt-3">
                            <p className="text-muted mb-2">Total</p>
                            <h5 className="font-size-16">
                              R{product.totalPrice}.00
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </Col>
            
         
            <Col xl="4">
              <div className="mt-5 mt-lg-0">
                <Card className="border shadow-none">
                  <div className="card-header bg-transparent border-bottom py-3 px-4">
                    <h5 className="font-size-16 mb-0">
                      Order Summary <span className="float-end">#MN0124</span>
                    </h5>
                  </div>
                  <CardBody className="p-4">
                    <div className="table-responsive">
                      <Table className="table mb-0">
                        <tbody>
                          <tr>
                            <td>Sub Total :</td>
                            <td className="text-end">
                              R{cartDetails.amountExlVat}.00
                            </td>
                          </tr>
                          <tr>
                            <td>Discount : </td>
                            <td className="text-end">- R 0</td>
                          </tr>
                          <tr>
                            <td>Recuring Amount:</td>
                            <td className="text-end">
                              R {cartDetails.recuringAmount}.00
                            </td>
                          </tr>
                          <tr>
                            <td>Estimated Tax : </td>
                            <td className="text-end">
                              R {cartDetails.vatAmount}.00
                            </td>
                          </tr>
                          <tr className="bg-light">
                            <th>Total :</th>
                            <td className="text-end">
                              <span className="fw-bold">
                                R {cartDetails.totalAmount}.00
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Link
                                to="/ecommerceaddress"
                                className="btn btn-primary btn-lg btn-block waves-effect waves-light mb-1"
                              >
                                <i className="mdi mdi-cash-multiple"></i> Pay
                                Now
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
             )}
             {productList.length === 0 &&(
                <Row>
                   <Col xl="12">
              <div className="mt-5 mt-lg-0">
                <Card className="border shadow-none">
                  <div className="card-header bg-transparent border-bottom py-3 px-4">
                 
                  </div>
                  <CardBody className="p-4">
                    <div className="table-responsive">
                        <h5 className="font-size-16 mb-0">Empty Cart </h5>
                    </div>

                  </CardBody>
                </Card>
              </div>
            </Col>
                </Row>
             )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceCart;
