


def middlemansolver(suppliers, customers):
    numSuppliers = len(suppliers)
    numCustomers = len(customers)

    # Calculate total supply and demand
    totalSupply = 0
    totalDemand = 0

    for i in range(numSuppliers):
        totalSupply += suppliers[i]["supply"]

    for i in range(numCustomers):
        totalDemand += customers[i]["demand"]

    individualProfits = []
    optimalTransport = []

    # Calculate individual profits and initialize optimal transport with zeros
    for i in range(numSuppliers):
        supplier = suppliers[i]
        transportCosts = supplier["transportCosts"]
        purchasePrice = supplier["purchasePrice"]

        supplierProfits = []
        supplierTransport = [0] * numCustomers

        for j in range(numCustomers):
            customer = customers[j]
            sellingPrice = customer["sellingPrice"]

            transportCost = transportCosts[j]
            profit = sellingPrice - purchasePrice - transportCost

            supplierProfits.append(profit)

        individualProfits.append(supplierProfits)
        optimalTransport.append(supplierTransport)

    # Adjust supply and demand to be equal
    if totalSupply > totalDemand:
        # Add a dummy customer with zero demand
        customers.append({"demand": totalSupply, "sellingPrice": 0})
        numCustomers += 1
        for i in range(numSuppliers):
            individualProfits[i].append(0)
            optimalTransport[i].append(0)
            suppliers[i]["transportCosts"].append(0)
    elif totalDemand > totalSupply:
        # Add a dummy supplier with zero supply
        numSuppliers += 1
        suppliers.append({
            "supply": totalDemand,
            "purchasePrice": 0,
            "transportCosts": [0] * numCustomers
        })
        arr = [0] * numCustomers
        individualProfits.append(arr)
        optimalTransport.append(arr)

    # Perform the Minimum Cell Cost Method
    remainingSupply = totalSupply
    remainingDemand = totalDemand

    while remainingSupply > 0 and remainingDemand > 0:
        maxProfit = float("-inf")
        maxSupplier = -1
        maxCustomer = -1

        # Find the maximum profit cell
        for i in range(numSuppliers):
            for j in range(numCustomers):
                if optimalTransport[i][j] == 0 and individualProfits[i][j] > maxProfit:
                    maxProfit = individualProfits[i][j]
                    maxSupplier = i
                    maxCustomer = j

        supply = suppliers[maxSupplier]["supply"]
        demand = customers[maxCustomer]["demand"]
        transportQuantity = min(supply, demand, remainingSupply, remainingDemand)

        optimalTransport[maxSupplier][maxCustomer] = transportQuantity
        remainingSupply -= transportQuantity
        remainingDemand -= transportQuantity
        if remainingDemand == 0 or remainingSupply == 0:
            optimalTransport[maxSupplier][maxCustomer] = 0

    # Calculate total cost, income, and profit
    totalCost = 0
    income = 0

    for i in range(numSuppliers):
        supplier = suppliers[i]
        transportCosts = supplier["transportCosts"]
        purchasePrice = supplier["purchasePrice"]

        for j in range(numCustomers):
            transportQuantity = optimalTransport[i][j]
            transportCost = transportCosts[j]
            sellingPrice = customers[j]["sellingPrice"]
            totalCost += (transportCost + purchasePrice) * transportQuantity
            income += sellingPrice * transportQuantity

    result = [[optimalTransport[0][0],optimalTransport[0][1],optimalTransport[1][0],optimalTransport[1][1]],[individualProfits[0][0],individualProfits[0][1],individualProfits[1][0],individualProfits[1][1]],totalCost,income,income-totalCost]
    return result

