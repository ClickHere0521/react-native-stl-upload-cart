import React, { useState } from 'react';

import { 
	StyleSheet, 
	Button, 
	Text, 
	View, 
	TouchableOpacity, 
	ScrollView, 
	Image, 
	ActivityIndicator, 
	TextInput, 
	Alert 
} from 'react-native';

import FontAwesome, {
	SolidIcons,
	RegularIcons,
	BrandIcons,
	parseIconFromClassName,
  } from 'react-native-fontawesome';

import Shopify from 'react-native-shopify';
import Client from 'shopify-buy';
import { WebView } from 'react-native-webview';

const styles = StyleSheet.create({
	centerElement: {justifyContent: 'center', alignItems: 'center'},
});

const StlCart = (props) => {
	const [selectAll, setSelectAll] = useState(false)
	const [cartItemsIsLoading, setCartItemsIsLoading] = useState(false)
	const [cartItems, setCartItems] = useState(props.stls)
	const [webViewURL, setWebViewURL] = useState('')

	const selectHandler = (index, value) => {
		
		const newItems = [...cartItems]; // clone the array 
		newItems[index]['checked'] = value == 1 ? 0 : 1; // set the new value 		
		setCartItems(newItems); // set new state		
	}
	
	const selectHandlerAll = (value) => {
		const newItems = [...cartItems]; // clone the array 
		newItems.map((item, index) => {
			newItems[index]['checked'] = value == true ? 0 : 1; // set the new value 
		});
		setCartItems(newItems)
		setSelectAll(value == true ? false : true)
	}
	
	const deleteHandler = (index) => {
		Alert.alert(
			'',
			'Are you sure you want to delete this item from your cart?',			
			[
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: 'Delete', onPress: () => {
					const updatedCart = [...cartItems]; 
					updatedCart.splice(index, 1); 										
					props.updateStl(updatedCart)
					setCartItems(updatedCart)
				}},
			],
			{ cancelable: false }
		);		
	}
	
	const quantityHandler = (action, index) => {
		const newItems = [...cartItems]; // clone the array 		
		let currentQty = newItems[index]['qty'];		
		if(action == 'more'){
			newItems[index]['qty'] = currentQty + 1;
		} else if(action == 'less'){
			newItems[index]['qty'] = currentQty > 1 ? currentQty - 1 : 1;
		}		
		setCartItems(newItems) // set the quantity of cart
	}
	
	const subtotalPrice = () => {
		if(cartItems){
			return cartItems.reduce((sum, item) => sum + (item.checked == 1 ? item.qty * item.salePrice : 0), 0 );
		}
		return 0;
	}

	const LoadingIndicatorView = () => {
		return <ActivityIndicator color='#009b88' size='large' />
	}

	const checkout = () => {		

		const url = 'https://48e7eb576215d297cec26d8fe3615c36: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@testingworkspace.myshopify.com/admin/api/2021-01/products.json';
		if(cartItems)
		{
			let data = []
			cartItems.map ((item, key) => (
				{					
					 data = {
						"product": {
						    "title": item.name,
						    "body_html": "<strong>Good snowboard!</strong>",
						    "vendor": "Burton",
						    "product_type": "Snowboard",
						    "tags": [
						    	"Barnes & Noble",
								"John's Fav",
								"Big Air"
						    ]
						}
					}
				}
			))
		} 
		else
		{
			Alert.alert(
				'',
				'Please add products to the cart',			
				[
					{text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				],
				{ cancelable: false }
			);	
			return
		}
		
	
		try {
		const response = await fetch(url, {
			method: 'POST', // или 'PUT'
			body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
			headers: {
			'Content-Type': 'application/json'
			}
		});
		const json = await response.json();
		console.log('Успех:', JSON.stringify(json));
		} catch (error) {
		console.error('Ошибка:', error);
		}

		const client = Client.buildClient({
			domain: 'testingworkspace.myshopify.com',
			storefrontAccessToken: '2c7de280dfc262e2db2fdcf961b87fb0'
		});	
		fetch("https://quotes15.p.rapidapi.com/quotes/random/?language_code=en", {
			"method": "GET",
			"headers": {
			  "x-rapidapi-host": "quotes15.p.rapidapi.com",
			  "x-rapidapi-key": "yourapikey"
			}
		  })
			.then(response => response.json())
			.then(response => {
			  setQuote(response.content);
			  setSource(response.originator.name)
			})
			.catch(err => {
			  console.log(err);
			});

		client.product.fetchAll().then((products) => {
			// Do something with the products
			let prd = JSON.parse(JSON.stringify(products))
			// console.log(prd)
		});

		client.checkout.create().then((checkout) => {
			// Do something with the checkout
			// console.log(checkout);
			let checkoutObj = JSON.parse(JSON.stringify(checkout));
			const checkoutId = checkoutObj.id;
			const shippingAddress = {
				address1: 'Chestnut Street 92',
				address2: 'Apartment 2',
				city: 'Louisville',
				company: null,
				country: 'United States',
				firstName: 'Bob',
				lastName: 'Norman',
				phone: '555-625-1199',
				province: 'Kentucky',
				zip: '40202'
			  };

			client.checkout.updateShippingAddress(checkoutId, shippingAddress).then(checkout => {
			// console.log(JSON.parse(JSON.stringify(checkout)))
			// Do something with the updated checkout
				setWebViewURL(checkout.webUrl)
				console.log(checkout.webUrl)
			});
						
			const lineItemsToAdd = [
				{
				  variantId: 39342084882640,
				  quantity: 4,
				  customAttributes: [{ key: "MyKey", value: "MyValue" }]
				}
			  ];
		
			// client.checkout.addLineItems(checkoutId, lineItemsToAdd).then((checkout) => {
			// Do something with the updated checkout
			// console.log(checkout.weburl)
			// navigation.navigate('WebViewScreen', { url: checkout.webUrl })
			// });
		}).catch(error => {
			console.log(error.message)
		});

		/*	
		Shopify.initialize('testingworkspace.myshopify.com', '48e7eb576215d297cec26d8fe3615c36');
		Shopify.getShop().then(shop => {
			console.log(shop)
			// Save the shop somewhere and use it to display currency and other info			
			//  return getAllCollections();
		  }).then(collections => {
			  console.log('collections:'+ collections)
			// Do something with collections
			// return getAllTags();
		  }).then(tags => {
			//   console.log('tags:'+ tags)
			// And tags...
		  }).catch((error)=>{
			console.log("Api call error");
			alert(error.message);
		 });

		Shopify.getProducts().then(products => {
		// Show products to your users
			console.log(products)
		});		
		*/				
	}

	const getAllCollections = (page = 1, allCollections = []) =>
		Shopify.getCollections(page).then((collections) => { 
		if (_.size(collections)) {
			return getAllCollections(page + 1, [...allCollections, ...collections]);
		}		
		return allCollections;
		});

	// The same goes for tags...

	const getAllTags = (page = 1, allTags = []) =>
		Shopify.getProductTags(page).then((tags) => {
		if (_.size(tags)) {
			return getAllTags(page + 1, [...allTags, ...tags]);
		}
		return allTags;
		});	

	return (
		<View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
			{/* <View style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 10}}>
				<View style={[styles.centerElement, {width: 50, height: 50}]}>
					 <Icon name="ios-cart" size={25} color="#000" /> 
				</View>
				<View style={[styles.centerElement, {height: 50}]}>
					<Text style={{fontSize: 18, color: '#000'}}>Shopping Cart</Text>
				</View>
			</View> */}							
			{cartItemsIsLoading ? (
				<View style={[styles.centerElement, {height: 300}]}>
					<ActivityIndicator size="large" color="#ef5739" />
				</View>
			) : (
				<ScrollView>	
					{cartItems && cartItems.map((item, i) => (
						<View key={i} style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 120}}>							
							<View style={[styles.centerElement, {width: 20}]}>
								<TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => selectHandler(i, item.checked)}>
									<FontAwesome style={{fontSize : 20}} icon={item.checked == 1 ? RegularIcons.checkCircle : RegularIcons.circle}/>									
								</TouchableOpacity>
							</View>
							<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
								{/* <TouchableOpacity onPress={() => console.log('thumbnail')} style={{paddingRight: 10, paddingLeft: 10}}>
									<Image source={{uri: item.thumbnailImage}} style={[styles.centerElement, {height: 60, width: 60, backgroundColor: '#eeeeee', marginTop: 10}]} />
									</TouchableOpacity> */}
								<View style={{flexGrow: 1, flexShrink: 1, alignSelf: 'center', paddingLeft:20}}>
									<Text style={{width:220}}>{item.name}</Text>
									<Text style={{color: '#8f8f8f'}}>{item.volume ? 'Volume: ' + parseFloat(item.volume).toFixed(4)+'(cm^3)' : ''}</Text>
									<Text style={{color: '#8f8f8f'}}>{item.boundingBox ? 'BoundingBox: ' + parseFloat(item.boundingBox[0]).toFixed(1)+'*'+parseFloat(item.boundingBox[1]).toFixed(1)+'*'+parseFloat(item.boundingBox[2]).toFixed(1) +'(mm)' : ''}</Text>
									<Text style={{color: '#333333', marginBottom: 10}}>${item.qty * item.salePrice}</Text>
									<View style={{flexDirection: 'row'}}>
										<TouchableOpacity onPress={() => quantityHandler('less', i)} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
											<FontAwesome style={{padding: 3, fontSize : 15, color: '#aaa'}} icon={SolidIcons.minus}/>
										</TouchableOpacity>
										<Text style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#cccccc', paddingHorizontal: 7, paddingTop: 3, color: '#bbbbbb', fontSize: 13, fontWeight: 'bold' }}>{item.qty}</Text>
										<TouchableOpacity onPress={() => quantityHandler('more', i)} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
											<FontAwesome style={{padding: 3, fontSize : 15, color: '#aaa'}} icon={SolidIcons.plus}/>
										</TouchableOpacity>
									</View>
								</View>								
							</View>
							<View style={[styles.centerElement, {width: 60}]}>
								<TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => deleteHandler(i)}>									
									<FontAwesome style={{fontSize: 18}} icon={RegularIcons.trashAlt} />
								</TouchableOpacity>
							</View>							
						</View>
					))}
				</ScrollView>
			)}						
			
			{!cartItemsIsLoading &&
				<View style={{backgroundColor: '#fff', borderTopWidth: 2, borderColor: '#f6f6f6', paddingVertical: 5}}>
					<View style={{flexDirection: 'row'}}>
						<View style={[styles.centerElement, {width: 20}]}>
							<TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => selectHandlerAll(selectAll)}>								
								<FontAwesome icon={selectAll ==true ? RegularIcons.checkCircle : RegularIcons.circle} style={{fontSize: 20,}}/>
							</TouchableOpacity>
						</View>
						<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10}}>
							<Text>Select All</Text>
							<View style={{flexDirection: 'row', paddingRight: 20, alignItems: 'center'}}>
								<Text style={{color: '#8f8f8f'}}>SubTotal: </Text>
								<Text>${subtotalPrice().toFixed(2)}</Text>
							</View>
						</View>
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'flex-end', height: 32, paddingRight: 20, alignItems: 'center'}}>
						<TouchableOpacity style={[styles.centerElement, {backgroundColor: '#009688', width: 100, height: 25, borderRadius: 5}]} onPress={checkout}>
							<Text style={{color: '#ffffff'}}>Checkout</Text>
						</TouchableOpacity>						
					</View>
				</View>
			}			
			<WebView
				originWhitelist={['*']}
				source={{ uri: webViewURL }}  
				renderLoading={LoadingIndicatorView}
				startInLoadingState={true}
				style={{width: 300, height: 300}}
			/>
		</View>
	)
}

export default StlCart