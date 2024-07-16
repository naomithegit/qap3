
UPDATE products SET productname = $2, productdescription = $3, productprice = $4, stockquantity = $5 WHERE productid = $1;