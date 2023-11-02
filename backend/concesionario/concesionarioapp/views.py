from django.http import JsonResponse

def get_data(request):
    data_list = ["Hola"]
    return JsonResponse(data_list, safe=False)
