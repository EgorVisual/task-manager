from rest_framework import viewsets, permissions, status
from .models import Task, User
from rest_framework.response import Response
from .serializers import TaskSerializer, UserSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = TaskSerializer

    def list(self, request):
        user_id = self.request.query_params.get('id')
        if user_id is not None:
            tasks = Task.objects.filter(user=user_id)
        if user_id is None:
            tasks = Task.objects.all()
        tasks_serializer = TaskSerializer(tasks, many=True)
        return Response(tasks_serializer.data)
    
    def retrieve(self, request, pk):
        task = Task.objects.get(id=pk)
        task_serializer = TaskSerializer(task)
        return Response(task_serializer.data)

    def create(self, request):
        title = request.data['title']
        description = request.data['description']
        status_task = request.data['status_task']
        user = request.data['user'] if request.data['user'] else 'null'
        Task.objects.create(title=title, description=description, status_task=status_task,user=User.objects.get(id=user))
        return Response("TaskSerializer.data")

    def delete(self, request, pk):
        task = self.get_object(pk)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer

    def list(self, request):
        users = User.objects.all()
        user_serializer = UserSerializer(users, many=True)
        return Response(user_serializer.data)

    def retrieve(self, request, pk):
        user = User.objects.get(id=pk)
        user_serializer = UserSerializer(user)
        return Response(user_serializer.data)

    def create(self, request):
        username = request.data['username']
        password = request.data['password']
        fullname = request.data['fullname'] if request.data['fullname'] else 'null'
        group = request.data['group'] if request.data['group'] else 'null'
        role = request.data['role'] if request.data['role'] else 'null'

        User.objects.create(username=username, password=password,
                            fullname=fullname, group=group, role=role)
        return Response("User.objects.order_by('-pk')[0]")

    def delete(self, request, pk):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
