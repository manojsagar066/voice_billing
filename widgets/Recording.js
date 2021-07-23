import React from 'react'
import {View,Image,Text,Dimensions,FlatList} from 'react-native';
import ItemsCard from './ItemsCard';
import BillTotal from './BillTotal';
function Recording(props) {
    const {isRec,isRes,customerName,voiceData,billData,billTotal,setBillData,setTotal} = props;
    if (!isRec && !isRes && billData.length === 0){
        return (
          <View>
            <Text
              style={{
                fontSize: Dimensions.get("window").width / 13,
                textAlign:'center',
                color: "#187fcc",
              }}
            >
              Start Billing {customerName}'s bill
            </Text>
          </View>
        );
    }
    else if(isRec && !isRes){
        return <Image style={{width:Dimensions.get('window').width *0.9}} source={require("../assets/recording.gif")} />;
    }
    else if(isRes && !isRec){
        return (
          <Image
            
            source={require("../assets/loading2.gif")}
          />
        );
    }
    else if(billData == undefined){

    }
    else if(!isRec && !isRes && billData.length > 0){
      // console.log('in recording',billData);
        return (
          <View>
            <BillTotal total={billTotal} />
            <FlatList
              keyExtractor={(item, index) => {
                if (
                  item["Item Name"] !== undefined &&
                  item["Price ₹"] !== undefined &&
                  item.Quantity !== undefined &&
                  item.Units !== undefined
                ) {
                  return item["Item Name"] + index;
                }
              }}
              data={billData}
              renderItem={({ item }) => {
                if (
                  item["Item Name"] !== undefined &&
                  item["Price ₹"] !== undefined &&
                  item.Quantity !== undefined &&
                  item.Units !== undefined
                ) {
                  return (
                    <ItemsCard
                      setTotal={setTotal}
                      title={item["Item Name"]}
                      quantity={item.Quantity}
                      units={item.Units}
                      cost={item["Price ₹"]}
                      setBillData={setBillData}
                    />
                  );
                }
              }}
            />
          </View>
        );
    }
    else{
        return <View/>
    }
    
}

export default Recording

