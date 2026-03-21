import json

from rest_framework import serializers

from .models import (
    Collection,
    CollectionImage,
    CraftFeature,
    Craftsmanship,
    Review,
    Work,
    WorkImage,
)


class AbsoluteImageUrlMixin:
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        if not obj.image:
            return None

        stored_value = str(obj.image)
        if stored_value.startswith(("http://", "https://")):
            return stored_value

        resolved_url = obj.image.url
        if resolved_url.startswith(("http://", "https://")):
            return resolved_url

        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(resolved_url)

        return resolved_url


class CollectionImageSerializer(AbsoluteImageUrlMixin, serializers.ModelSerializer):
    class Meta:
        model = CollectionImage
        fields = ("id", "image")


class WorkImageSerializer(AbsoluteImageUrlMixin, serializers.ModelSerializer):
    class Meta:
        model = WorkImage
        fields = ("id", "image")


class CollectionSerializer(AbsoluteImageUrlMixin, serializers.ModelSerializer):
    images = CollectionImageSerializer(many=True, read_only=True)

    class Meta:
        model = Collection
        fields = (
            "id",
            "name",
            "slug",
            "type",
            "image",
            "images",
            "description",
            "tag",
            "price_range",
            "status",
            "featured",
            "order",
            "created_at",
        )


class CraftFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = CraftFeature
        fields = ("id", "point")


class CraftsmanshipSerializer(AbsoluteImageUrlMixin, serializers.ModelSerializer):
    features = CraftFeatureSerializer(many=True, read_only=True)

    class Meta:
        model = Craftsmanship
        fields = (
            "id",
            "title",
            "image",
            "description",
            "features",
            "status",
            "featured",
            "order",
            "created_at",
        )


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ("id", "name", "rating", "comment", "created_at")


class WorkSerializer(AbsoluteImageUrlMixin, serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = (
            "id",
            "title",
            "slug",
            "image",
            "location",
            "category",
            "description",
            "status",
            "featured",
            "order",
            "created_at",
        )


class WorkDetailSerializer(AbsoluteImageUrlMixin, serializers.ModelSerializer):
    images = WorkImageSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Work
        fields = (
            "id",
            "title",
            "slug",
            "image",
            "images",
            "location",
            "category",
            "description",
            "status",
            "featured",
            "order",
            "reviews",
            "created_at",
        )


class JsonPayloadMixin:
    def _parse_payload(self, field_name, default):
        value = self.initial_data.get(field_name, default)
        if value in ("", None):
            return default
        if isinstance(value, (list, dict)):
            return value
        try:
            return json.loads(value)
        except (TypeError, json.JSONDecodeError) as error:
            raise serializers.ValidationError({field_name: "Invalid JSON payload."}) from error


class CollectionWriteSerializer(JsonPayloadMixin, serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Collection
        fields = (
            "id",
            "name",
            "type",
            "image",
            "description",
            "tag",
            "price_range",
            "status",
            "featured",
            "order",
        )

    def validate(self, attrs):
        if self.instance is None and "image" not in attrs:
            raise serializers.ValidationError({"image": "A primary image is required."})
        return attrs

    def create(self, validated_data):
        request = self.context["request"]
        gallery_images = request.FILES.getlist("gallery_images")
        instance = Collection.objects.create(**validated_data)
        CollectionImage.objects.bulk_create(
            [CollectionImage(collection=instance, image=image) for image in gallery_images]
        )
        return instance

    def update(self, instance, validated_data):
        request = self.context["request"]
        keep_image_ids = self._parse_payload("keep_image_ids_payload", None)
        new_gallery_images = request.FILES.getlist("gallery_images")

        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()

        if keep_image_ids is not None:
            instance.images.exclude(id__in=keep_image_ids).delete()

        for image in new_gallery_images:
            CollectionImage.objects.create(collection=instance, image=image)

        return instance

    def to_representation(self, instance):
        return CollectionSerializer(instance, context=self.context).data


class CraftsmanshipWriteSerializer(JsonPayloadMixin, serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Craftsmanship
        fields = (
            "id",
            "title",
            "image",
            "description",
            "status",
            "featured",
            "order",
        )

    def validate(self, attrs):
        if self.instance is None and "image" not in attrs:
            raise serializers.ValidationError({"image": "An image is required."})

        features = self._parse_payload("features_payload", [])
        if not isinstance(features, list):
            raise serializers.ValidationError({"features_payload": "Features must be a list."})

        normalized = []
        for feature in features:
            if not isinstance(feature, str) or not feature.strip():
                raise serializers.ValidationError({"features_payload": "Each feature must be a non-empty string."})
            normalized.append(feature.strip())

        attrs["features_payload"] = normalized
        return attrs

    def create(self, validated_data):
        features = validated_data.pop("features_payload", [])
        instance = Craftsmanship.objects.create(**validated_data)
        CraftFeature.objects.bulk_create(
            [CraftFeature(craft=instance, point=feature) for feature in features]
        )
        return instance

    def update(self, instance, validated_data):
        features = validated_data.pop("features_payload", None)

        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()

        if features is not None:
            instance.features.all().delete()
            CraftFeature.objects.bulk_create(
                [CraftFeature(craft=instance, point=feature) for feature in features]
            )

        return instance

    def to_representation(self, instance):
        return CraftsmanshipSerializer(instance, context=self.context).data


class WorkWriteSerializer(JsonPayloadMixin, serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Work
        fields = (
            "id",
            "title",
            "image",
            "location",
            "category",
            "description",
            "status",
            "featured",
            "order",
        )

    def validate(self, attrs):
        if self.instance is None and "image" not in attrs:
            raise serializers.ValidationError({"image": "A cover image is required."})

        reviews = self._parse_payload("reviews_payload", [])
        if not isinstance(reviews, list):
            raise serializers.ValidationError({"reviews_payload": "Reviews must be a list."})

        validated_reviews = []
        for review in reviews:
            if not isinstance(review, dict):
                raise serializers.ValidationError({"reviews_payload": "Each review must be an object."})

            name = str(review.get("name", "")).strip()
            comment = str(review.get("comment", "")).strip()

            try:
                rating = int(review.get("rating", 0))
            except (TypeError, ValueError) as error:
                raise serializers.ValidationError({"reviews_payload": "Review rating must be a number."}) from error

            if not name or not comment or rating < 1 or rating > 5:
                raise serializers.ValidationError(
                    {"reviews_payload": "Each review requires name, comment, and a rating from 1 to 5."}
                )

            validated_reviews.append(
                {
                    "name": name,
                    "comment": comment,
                    "rating": rating,
                }
            )

        attrs["reviews_payload"] = validated_reviews
        return attrs

    def create(self, validated_data):
        request = self.context["request"]
        gallery_images = request.FILES.getlist("gallery_images")
        reviews = validated_data.pop("reviews_payload", [])
        instance = Work.objects.create(**validated_data)

        WorkImage.objects.bulk_create(
            [WorkImage(work=instance, image=image) for image in gallery_images]
        )
        Review.objects.bulk_create([Review(work=instance, **review) for review in reviews])
        return instance

    def update(self, instance, validated_data):
        request = self.context["request"]
        keep_image_ids = self._parse_payload("keep_image_ids_payload", None)
        new_gallery_images = request.FILES.getlist("gallery_images")
        reviews = validated_data.pop("reviews_payload", None)

        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()

        if keep_image_ids is not None:
            instance.images.exclude(id__in=keep_image_ids).delete()

        for image in new_gallery_images:
            WorkImage.objects.create(work=instance, image=image)

        if reviews is not None:
            instance.reviews.all().delete()
            Review.objects.bulk_create([Review(work=instance, **review) for review in reviews])

        return instance

    def to_representation(self, instance):
        return WorkDetailSerializer(instance, context=self.context).data

