from rest_framework import routers

from .api import TaskViewSet, UserViewSet

router = routers.DefaultRouter()
router.register('api/task', TaskViewSet, 'task')
router.register('api/user', UserViewSet, 'user')

urlpatterns = router.urls
