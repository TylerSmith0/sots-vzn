import mysql.connector, os, asyncio
from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect

# Create your views here.
async def index(request):
    return render(request, 'pages/index.html')

async def game(request):
    return render(request, 'pages/game.html')

async def capeclasp(request):
    if request.method == 'GET':
        return render(request, 'pages/capeclasp-connect.html')

# @csrf_protect
async def capeclaspform(request):
    if request.method == 'GET':
        try:
            walletAddr = request.GET["wallet"]
        except:
            walletAddr = ""
        try:
            connect = bool(request.GET["connected"])
        except:
            connect = False
        return render(request, 'pages/capeclasp-form.html', {'wallet': walletAddr, 'alerts': ""})
    
    elif request.method == 'POST' and 'submit' in request.POST:
        walletAddress = request.POST["wallet"]
        firstName = request.POST["first-name"]
        lastName = request.POST["last-name"]
        email = request.POST["email"]
        orderNumber = request.POST["order-number"]
        
        try:
            walletAddress = request.POST["wallet-address"]
        except:
            pass

        submission, status = await validateSubmission(firstName, lastName, email, orderNumber, walletAddress)
        if (submission):
            return render(request, 'pages/valid-submission.html')
        elif status == "quotes":
            return render(request, 'pages/capeclasp-form.html', {'wallet': walletAddress, 'alerts': "Please remove all single and double quotes from entries."})
        else:
            return render(request, 'pages/invalid-submission.html', {'status': status})


async def validateSubmission(f, l, e, o, w):

    if f is None:
        return (False, "firstname")
    elif l is None:
        return (False, "lastname")
    elif e is None:
        return (False, "email")
    elif o is None:
        return (False, "order")
    elif w is None:
        return (False, "wallet")

    if "'" in f or '"' in f:
        return (False, "quotes")
    elif "'" in l or '"' in l:
        return (False, "quotes")
    elif "'" in e or '"' in e:
        return (False, "quotes")
    elif "'" in o or '"' in o:
        return (False, "quotes")
    elif "'" in w or '"' in w:
        return (False, "quotes")

    ## Check if entry exists
    try:
        conn=mysql.connector.connect(user=os.environ.get("DB_USER"),
                                     password=os.environ.get("DB_PASSWORD"),
                                     host=os.environ.get("DB_HOST"),
                                     database=os.environ.get("DB_NAME"))
    except e:
        return (False, e)
    # try:
    try:
        c = conn.cursor()
        # print("Cursor created")
        c.execute(f"INSERT INTO `{os.environ.get('DB_TABLE')}` VALUES ('{f}', '{l}', '{o}', '{e}', '{w}');")
        # print("executed function")
        conn.commit()
        # print("committed function")
        conn.close()
    except:
        conn.close()
        return (False, "internal-connection-query")

    return (True, "submission")


async def claim(request):
    return render(request, 'pages/claim.html')