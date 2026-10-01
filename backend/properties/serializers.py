from rest_framework import serializers
from .models import Agent, Appointment, Inquiry, Property, PropertyImage


class PropertyImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = PropertyImage
        fields = ["id", "image"]

    def get_image(self, obj):
        request = self.context.get("request")
        url = request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return url.replace("http://", "https://", 1)


class AgentSerializer(serializers.ModelSerializer):
    properties_count = serializers.IntegerField(source="properties.count", read_only=True)

    class Meta:
        model = Agent
        fields = ["id", "name", "photo", "designation", "location", "phone", "email",
                  "biography", "experience_years", "properties_count"]


class PropertyListSerializer(serializers.ModelSerializer):
    """Light version used for cards and lists."""
    cover_image = serializers.SerializerMethodField()
    status_label = serializers.CharField(source="get_status_display", read_only=True)
    type_label = serializers.CharField(source="get_property_type_display", read_only=True)

    class Meta:
        model = Property
        fields = ["id", "title", "slug", "price", "location", "city", "property_type", "type_label",
                  "status", "status_label", "bedrooms", "bathrooms", "area", "featured", "cover_image"]

    def get_cover_image(self, obj):
        first = obj.images.first()
        if not first:
            return None
        request = self.context.get("request")
        url = request.build_absolute_uri(first.image.url) if request else first.image.url
        return url.replace("http://", "https://", 1)


class PropertyDetailSerializer(PropertyListSerializer):
    """Full version used on the details page."""
    images = PropertyImageSerializer(many=True, read_only=True)
    agent = AgentSerializer(read_only=True)

    class Meta(PropertyListSerializer.Meta):
        fields = PropertyListSerializer.Meta.fields + ["description", "images", "agent", "created_at"]


class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = ["id", "name", "email", "phone", "property", "message"]


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ["id", "name", "email", "phone", "property", "preferred_date", "preferred_time", "message"]