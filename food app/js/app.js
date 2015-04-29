(function() {
    
    var app = angular.module('foodApp', []);

    app.controller('foodController', ['$http', function($http) {

        
        var food = this;
        food.foodData = [];
        
        food.isHidden = true;
        food.itemNameArray = [];
        food.itemName = "";
        food.vitaminAPercentage = "";
        food.vitaminCPercentage = "";
        
        var calcium = "";
        var chart;
        
        var foodQuery = document.getElementById("foodInput").value;
        console.log(foodQuery);
        
        food.searchFood = function() {

            var foodQuery = document.getElementById("foodInput").value;

            $http({
                    url: "https://api.nutritionix.com/v1_1/search/" + foodQuery + "?&appId=495f0345&appKey=84664e209b7d6a6c0c6b4cbe88dad6a9&fields=item_name,nf_calories,brand_name,item_description,nf_total_fat,nf_saturated_fat,nf_cholesterol,nf_sodium,nf_total_carbohydrate,nf_sugars,nf_protein,nf_vitamin_a_dv,nf_vitamin_c_dv,nf_calcium_dv,nf_iron_dv,nf_potassium,nf_serving_weight_grams,images_front_full_url,nf_dietary_fiber,upc,brand_id,upc,nf_ingredient_statement,nf_saturated_fat,nf_monounsaturated_fat,nf_polyunsaturated_fat,nf_trans_fatty_acid,nf_refuse_pct&brand_id=513fcc648110a4cafb90ca5e",
                    dataType: "jsonp",
                    jsonp: "callback"
                })
                .success(function(json) {
                
                    
                
                    console.log("total hits : " + json.total_hits);
                    console.log(json);
                
                    if (json.total_hits == 0)
                    {
                        food.isHidden = true;
                        food.unknown = "Please enter a valid food name";
                    }
                    else
                    {
                    
                        
                    food.isHidden = false;
                    food.foodData = json.hits[0].fields;
                    
                    food.itemNameArray = json.hits[0].fields.item_name.split('-');
                    food.itemName = food.itemNameArray[0];    
                
                    console.log("item name = " + food.itemName);
                
                    console.log(food.foodData);
                        
                    food.calculateExercise();
                
                    var calorieWidth = ((food.foodData.nf_calories/food.foodData.nf_serving_weight_grams*100)/2500 * 100) + "px";
                    $("#calorieRectangle").animate({width: calorieWidth}, 500);
                
                    food.calories = Math.floor(((food.foodData.nf_calories/food.foodData.nf_serving_weight_grams*100)/2500 * 100)) + "%";
                    
                    var sugarWidth = ((food.foodData.nf_sugars/food.foodData.nf_serving_weight_grams * 100)/37.5*100) + "px";
                    $("#sugarRectangle").animate({width: sugarWidth}, 500);
                    
                    food.sugar = Math.floor(((food.foodData.nf_sugars/food.foodData.nf_serving_weight_grams * 100)/37.5*100)) + "%";
                
                    var proteinWidth = ((food.foodData.nf_protein/food.foodData.nf_serving_weight_grams*100)/56 * 100) + "px";
                    $("#proteinRectangle").animate({width: proteinWidth}, 500);
                
                    food.protein = Math.floor(((food.foodData.nf_protein/food.foodData.nf_serving_weight_grams*100)/56 * 100)) + "%";
                
                    var fatWidth = ((food.foodData.nf_total_fat/food.foodData.nf_serving_weight_grams*100)/83 * 100) + "px";
                    $("#fatRectangle").animate({width: fatWidth}, 500);
                
                    food.fat = Math.floor(((food.foodData.nf_total_fat/food.foodData.nf_serving_weight_grams*100)/83 * 100)) + "%";
                
                    var sodiumWidth = ((food.foodData.nf_sodium/food.foodData.nf_serving_weight_grams*100)/2300 * 100) + "px";
                    $("#sodiumRectangle").animate({width: sodiumWidth}, 500);
                
                    food.sodium = Math.floor(((food.foodData.nf_sodium/food.foodData.nf_serving_weight_grams*100)/2300 * 100)) + "%";
                
                    var vitaminAFactor = (food.foodData.nf_vitamin_a_dv/food.foodData.nf_serving_weight_grams*100);
                    var vitaminCFactor = (food.foodData.nf_vitamin_c_dv/food.foodData.nf_serving_weight_grams*100);
                
                    food.vitaminAPercentage = Math.ceil(vitaminAFactor);
                    food.vitaminCPercentage = Math.ceil(vitaminCFactor);
                
                    food.vitaminAImage = "";
                    food.vitaminAImageText = "";
                
                    food.vitaminCImage = "";
                    food.vitaminCImageText = "";
                
                    // VITAMIN A
                
                    if ( vitaminAFactor < 10 )
                    {
                        food.vitaminAImage = "vitaminA_0";
                        food.vitaminAImageText = "0% - 10%";
                    }
                    else if ( vitaminAFactor < 20 && vitaminAFactor >= 10 )
                    {
                        food.vitaminAImage = "vitaminA_10";
                        food.vitaminAImageText = "10% - 19%";
                    }
                    else if ( vitaminAFactor < 30 && vitaminAFactor >= 20 )
                    {
                        food.vitaminAImage = "vitaminA_20";
                        food.vitaminAImageText = "20% - 29%";
                    }
                    else if ( vitaminAFactor < 40 && vitaminAFactor >= 30 )
                    {
                        food.vitaminAImage = "vitaminA_30";
                        food.vitaminAImageText = "30% - 39%";
                    }
                    else if ( vitaminAFactor < 50 && vitaminAFactor >= 40 )
                    {
                        food.vitaminAImage = "vitaminA_40";
                        food.vitaminAImageText = "40% - 49%";
                    }
                    else if ( vitaminAFactor < 60 && vitaminAFactor >= 50 )
                    {
                        food.vitaminAImage = "vitaminA_50";
                        food.vitaminAImageText = "50% - 59%";
                    }
                    else if ( vitaminAFactor < 70 && vitaminAFactor >= 60 )
                    {
                        food.vitaminAImage = "vitaminA_60";
                        food.vitaminAImageText = "60% - 69%";
                    }
                    else if ( vitaminAFactor < 80 && vitaminAFactor >= 70 )
                    {
                        food.vitaminAImage = "vitaminA_70";
                        food.vitaminAImageText = "70% - 79%";
                    }
                    else if ( vitaminAFactor < 90 && vitaminAFactor >= 80 )
                    {
                        food.vitaminAImage = "vitaminA_80";
                        food.vitaminAImageText = "80% - 89%";
                    }
                    else if ( vitaminAFactor < 100  && vitaminAFactor >= 90 )
                    {
                        food.vitaminAImage = "vitaminA_90";
                        food.vitaminAImageText = "90% - 99%";
                    }
                    else if ( vitaminAFactor >= 100)
                    {
                        food.vitaminAImage = "vitaminA_100";
                        food.vitaminAImageText = "+ 100%";
                    }
                
                    //VITAMIN C
                
                     if ( vitaminCFactor < 10 )
                    {
                        food.vitaminCImage = "vitaminC_0";
                        food.vitaminCImageText = "0% - 10%";
                    }
                    else if ( vitaminCFactor < 20 && vitaminCFactor >= 10 )
                    {
                        food.vitaminCImage = "vitaminC_10";
                        food.vitaminCImageText = "10% - 19%";
                    }
                    else if ( vitaminCFactor < 30 && vitaminCFactor >= 20 )
                    {
                        food.vitaminCImage = "vitaminC_20";
                        food.vitaminCImageText = "20% - 29%";
                    }
                    else if ( vitaminCFactor < 40 && vitaminCFactor >= 30 )
                    {
                        food.vitaminCImage = "vitaminC_30";
                        food.vitaminCImageText = "30% - 39%";
                    }
                    else if ( vitaminCFactor < 50 && vitaminCFactor >= 40 )
                    {
                        food.vitaminCImage = "vitaminC_40";
                        food.vitaminCImageText = "40% - 49%";
                    }
                    else if ( vitaminCFactor < 60 && vitaminCFactor >= 50 )
                    {
                        food.vitaminCImage = "vitaminC_50";
                        food.vitaminCImageText = "50% - 59%";
                    }
                    else if ( vitaminCFactor < 70 && vitaminCFactor >= 60 )
                    {
                        food.vitaminCImage = "vitaminC_60";
                        food.vitaminCImageText = "60% - 69%";
                    }
                    else if ( vitaminCFactor < 80 && vitaminCFactor >= 70 )
                    {
                        food.vitaminCImage = "vitaminC_70";
                        food.vitaminCImageText = "70% - 79%";
                    }
                    else if ( vitaminCFactor < 90 && vitaminCFactor >= 80 )
                    {
                        food.vitaminCImage = "vitaminC_80";
                        food.vitaminCImageText = "80% - 89%";
                    }
                    else if ( vitaminCFactor < 100  && vitaminCFactor >= 90 )
                    {
                        food.vitaminCImage = "vitaminC_90";
                        food.vitaminCImageText = "90% - 99%";
                    }
                    else if ( vitaminCFactor >= 100)
                    {
                        food.vitaminCImage = "vitaminC_100";
                        food.vitaminCImageText = "+ 100%";
                    }
                    
                    
                
                    calcium = (food.foodData.nf_calcium_dv/food.foodData.nf_serving_weight_grams * 100);

                    if ( calcium >= 10 )
                    {
                        food.calciumText = "Source of calcium";
                        food.calciumImage = "calcium";
                    }
                    else
                    {

                        food.calciumText = ">10% of calcium"
                        food.calciumImage = "nocalcium";
                    }

                    iron = (food.foodData.nf_iron_dv/food.foodData.nf_serving_weight_grams * 100);

                    if ( iron >= 10 )
                    {
                        food.ironText = "Source of iron";
                        food.ironImage = "iron";
                    }
                    else
                    {

                        food.ironText = ">10% of iron"
                        food.ironImage = "noiron";
                    }

                };
                
        
                });
   
        };
        
         food.calculateExercise = function() {

            var weight = document.getElementById("weightInput").value;
             //console.log(weight);

            var calories = food.foodData.nf_calories/food.foodData.nf_serving_weight_grams*100;
            //console.log('calories : ' + food.foodData.nf_calories + ' gewicht : ' + food.foodData.nf_serving_weight_grams)
            //console.log('calorieen :'  + calories);
                                                                   // /1000 * 15 for 150px per 1000 meter
            food.runningDistance = calories / weight / 1.036 * 1000 / 1000 * 15;
            food.runningDistanceTxt = (calories / weight / 1.036).toFixed(2);
            console.log('rd = ' + food.runningDistance);

            $("#runningLine").css("margin", 0).animate({width: food.runningDistance}, 1000);
                         
            var currentNumber = $('#distance').text();

            $({numberValue: currentNumber}).animate({numberValue: food.runningDistanceTxt}, {
                duration: 1000,
                easing: 'linear',
                step: function() { 
                    $('#distance').text(Math.ceil(this.numberValue*100)/100 + ' km'); 
                }
            });


        }
         
        food.info = function() {
                                  
        bootbox.dialog({
                title: "<h3>Amount in 100g</h3>",
                message: '<h4>General Info </h4>'+
                    '<p>calories = ' + food.foodData.nf_calories/food.foodData.nf_serving_weight_grams*100 +' kcal</p> ' +
                    '<p>sugar = '+ (food.foodData.nf_sugars/food.foodData.nf_serving_weight_grams*100).toFixed(2) + ' g</p>' +
                    '<p>protein = ' + (food.foodData.nf_protein/food.foodData.nf_serving_weight_grams*100).toFixed(2) + ' g</p> ' +
                    '<p>total fat = ' + (food.foodData.nf_total_fat/food.foodData.nf_serving_weight_grams*100).toFixed(2)+ ' g</p>' +
                    '<p>sodium = ' + (food.foodData.nf_sodium/food.foodData.nf_serving_weight_grams*100).toFixed(2) + ' g</p>' +
                    '<h4>minerals</h4>' +
                    '<p>calcium = ' + (food.foodData.nf_calcium_dv/food.foodData.nf_serving_weight_grams*100).toFixed(2)+ ' % (daily need)</p>' +
                    ' <p>iron = ' + (food.foodData.nf_iron_dv/food.foodData.nf_serving_weight_grams*100).toFixed(2) +'  % (daily need)</p> ' +
                    '<h4>carbohydrates</h4>' +
                    '<p>total carbohydrate = ' + (food.foodData.nf_total_carbohydrate/food.foodData.nf_serving_weight_grams*100).toFixed(2) +' g</p>' +
                    '<p>dietary fiber = ' + (food.foodData.nf_dietary_fiber/food.foodData.nf_serving_weight_grams*100).toFixed(2)+ ' g</p>' +
                    ' <h4>vitamins</h4>' +
                    '<p>vitamin A = ' + (food.foodData.nf_vitamin_a_dv/food.foodData.nf_serving_weight_grams*100).toFixed(2) + '% (daily need)</p>' +
                    '   <p>vitamin C = ' + (food.foodData.nf_vitamin_c_dv/food.foodData.nf_serving_weight_grams*100).toFixed(2) + ' % (daily need)</p>' +
                    '<h4>fat info</h4>' +
                    '<p>saturated fat = ' + (food.foodData.nf_saturated_fat/food.foodData.nf_serving_weight_grams*100).toFixed(2) + ' g</p>' +
                    '<p>monounsaturated fat = ' + (food.foodData.nf_monounsaturated_fat/food.foodData.nf_serving_weight_grams*100).toFixed(2) + ' g</p>' +
                    '<p>polyunsaturated fat = ' + (food.foodData.nf_polyunsaturated_fat/food.foodData.nf_serving_weight_grams*100).toFixed(2) + ' g</p>' +
                    '  <p>trans fatty acid = ' + (food.foodData.nf_trans_fatty_acid/food.foodData.nf_serving_weight_grams*100).toFixed(2) + ' g</p> '+
                      '<p>cholesterol = ' + (food.foodData.nf_cholesterol/food.foodData.nf_serving_weight_grams*100).toFixed(2)+ ' mg</p>' });

        }
        
        
       
        
    }]);
    
})();
    
  