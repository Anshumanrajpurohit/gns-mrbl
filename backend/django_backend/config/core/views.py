from rest_framework import generics
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser

from .models import Collection, Craftsmanship, PublishStatus, Work
from .serializers import (
    CollectionSerializer,
    CollectionWriteSerializer,
    CraftsmanshipSerializer,
    CraftsmanshipWriteSerializer,
    WorkDetailSerializer,
    WorkSerializer,
    WorkWriteSerializer,
)


def is_admin_request(request) -> bool:
    raw_value = request.headers.get("X-Admin-Mode") or request.query_params.get("admin")
    return str(raw_value).strip().lower() in {"1", "true", "yes"}


class RequestContextSerializerMixin:
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context


class CollectionListCreateAPIView(RequestContextSerializerMixin, generics.ListCreateAPIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def get_queryset(self):
        queryset = Collection.objects.all().prefetch_related("images")
        if not is_admin_request(self.request):
            queryset = queryset.filter(status=PublishStatus.PUBLISHED)

        collection_type = self.request.query_params.get("type")
        if collection_type:
            normalized_type = collection_type.strip().lower()
            if normalized_type in {"marble", "granite"}:
                queryset = queryset.filter(type__iexact=normalized_type)
        return queryset

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CollectionWriteSerializer
        return CollectionSerializer


class CollectionDetailAPIView(RequestContextSerializerMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Collection.objects.all().prefetch_related("images")
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def get_serializer_class(self):
        if self.request.method in {"PUT", "PATCH"}:
            return CollectionWriteSerializer
        return CollectionSerializer


class CraftsmanshipListCreateAPIView(RequestContextSerializerMixin, generics.ListCreateAPIView):
    queryset = Craftsmanship.objects.all().prefetch_related("features")
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def get_queryset(self):
        queryset = super().get_queryset()
        if not is_admin_request(self.request):
            queryset = queryset.filter(status=PublishStatus.PUBLISHED)
        return queryset

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CraftsmanshipWriteSerializer
        return CraftsmanshipSerializer


class CraftsmanshipDetailAPIView(RequestContextSerializerMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Craftsmanship.objects.all().prefetch_related("features")
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def get_serializer_class(self):
        if self.request.method in {"PUT", "PATCH"}:
            return CraftsmanshipWriteSerializer
        return CraftsmanshipSerializer


class WorkListCreateAPIView(RequestContextSerializerMixin, generics.ListCreateAPIView):
    queryset = Work.objects.all().prefetch_related("images", "reviews")
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def get_queryset(self):
        queryset = super().get_queryset()
        if not is_admin_request(self.request):
            queryset = queryset.filter(status=PublishStatus.PUBLISHED)
        return queryset

    def get_serializer_class(self):
        if self.request.method == "POST":
            return WorkWriteSerializer
        if is_admin_request(self.request):
            return WorkDetailSerializer
        return WorkSerializer


class WorkDetailByIdAPIView(RequestContextSerializerMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Work.objects.all().prefetch_related("images", "reviews")
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    lookup_field = "pk"

    def get_serializer_class(self):
        if self.request.method in {"PUT", "PATCH"}:
            return WorkWriteSerializer
        return WorkDetailSerializer


class WorkDetailAPIView(RequestContextSerializerMixin, generics.RetrieveAPIView):
    queryset = Work.objects.filter(status=PublishStatus.PUBLISHED).prefetch_related(
        "images",
        "reviews",
    )
    serializer_class = WorkDetailSerializer
    lookup_field = "slug"
