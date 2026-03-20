from django.urls import path

from .views import (
    CollectionDetailAPIView,
    CollectionListCreateAPIView,
    CraftsmanshipDetailAPIView,
    CraftsmanshipListCreateAPIView,
    WorkDetailAPIView,
    WorkDetailByIdAPIView,
    WorkListCreateAPIView,
)


urlpatterns = [
    path("collections/", CollectionListCreateAPIView.as_view(), name="collection-list"),
    path("collections/<int:pk>/", CollectionDetailAPIView.as_view(), name="collection-detail"),
    path(
        "craftsmanship/",
        CraftsmanshipListCreateAPIView.as_view(),
        name="craftsmanship-list",
    ),
    path(
        "craftsmanship/<int:pk>/",
        CraftsmanshipDetailAPIView.as_view(),
        name="craftsmanship-detail",
    ),
    path("work/", WorkListCreateAPIView.as_view(), name="work-list"),
    path("work/<int:pk>/", WorkDetailByIdAPIView.as_view(), name="work-detail-by-id"),
    path("work/<slug:slug>/", WorkDetailAPIView.as_view(), name="work-detail"),
]