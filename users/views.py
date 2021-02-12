from django.shortcuts import render, HttpResponse

def index(request):
    return render(request, 'accounts/auth.html')


def logout(request):
    return render(request, 'accounts/logout.html')