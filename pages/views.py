import asyncio
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse
from django.views.decorators.csrf import csrf_protect

# Create your views here.
def index(request):
    return render(request, 'pages/index.html')


def capeclasp(request):
    if request.method == 'GET':
        return render(request, 'pages/capeclasp-connect.html')

@csrf_protect
def capeclaspform(request):
    if request.method == 'GET':
        try:
            walletAddr = request.GET["wallet"]
        except:
            walletAddr = ""
        try:
            connect = bool(request.GET["connected"])
        except:
            connect = False
        return render(request, 'pages/capeclasp-form.html', {'wallet': walletAddr})
    
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

        if (validateSubmission()):
            print("First Name:\t"+firstName)
            print("Last Name:\t"+lastName)
            print("Order Number:\t"+orderNumber)
            print("Email:\t"+email)
            print("Wallet Addr:\t"+walletAddress)
            # submitForm(request)
            # return HttpResponse("Submission Received.")
            return render(request, 'pages/valid-submission.html')
        else:
            return render(request, 'pages/invalid-submission.html')


# @csrf_protect
# def capeclasp(request):
#     if request.method == 'GET':
#         if 'connected' in request.GET:
#             print("connected is there")
#             try:
#                 walletAddr = request.GET["wallet"]
                
#             except:
#                 walletAddr = ""

#             try:
#                 connect = bool(request.GET["connected"])
#             except:
#                 connect = False

#             print(f"Received: {walletAddr}")
#             print(f"Connected? {connect}")
#             return render(request, 'pages/capeclasp-form.html', context={'connected':connect, 'wallet':walletAddr})
#         else:
#             print('nope not here')
#             return render(request, 'pages/capeclasp-connect.html', context={'connected':False})
    
#     elif request.method == 'POST' and 'submit' in request.POST:
#         walletAddress = ""
#         firstName = request.POST["first-name"]
#         lastName = request.POST["last-name"]
#         email = request.POST["email"]
#         orderNumber = request.POST["order-number"]
        
#         try:
#             walletAddress = request.POST["wallet-address"]
#         except:
#             pass

#         if (validateSubmission()):
#             print("First Name:\t"+firstName)
#             print("Last Name:\t"+lastName)
#             print("Order Number:\t"+orderNumber)
#             print("Email:\t"+email)
#             print("Wallet Addr:\t"+walletAddress)
#             # submitForm(request)
#             # return HttpResponse("Submission Received.")
#             return render(request, 'pages/valid-submission.html')
#         else:
#             return render(request, 'pages/invalid-submission.html')

#     elif request.method == 'GET' and 'wallet' in request.GET:
        
        
#         return render(request, 'pages/capeclasp.html')
    
def process():
    print('we made it to process! hooray!')

def validateSubmission():
    print("This is where we validate")
    return True
