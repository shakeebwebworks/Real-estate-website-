from rest_framework import generics
from .models import Agent, Appointment, Inquiry, Property
from .serializers import (AgentSerializer, AppointmentSerializer, InquirySerializer,
                          PropertyDetailSerializer, PropertyListSerializer)


class PropertyListView(generics.ListAPIView):
    """
    GET /api/properties/
    Filters: ?city=&type=&status=&min_price=&max_price=&bedrooms=&featured=true&search=
    Sorting: ?ordering=price | -price | -created_at
    Pagination: ?page=2
    """
    serializer_class = PropertyListSerializer

    def get_queryset(self):
        qs = Property.objects.prefetch_related("images")
        p = self.request.query_params

        if p.get("city"):
            qs = qs.filter(city__iexact=p["city"])
        if p.get("type"):
            qs = qs.filter(property_type=p["type"])
        if p.get("status"):
            qs = qs.filter(status=p["status"])
        if p.get("min_price"):
            qs = qs.filter(price__gte=p["min_price"])
        if p.get("max_price"):
            qs = qs.filter(price__lte=p["max_price"])
        if p.get("bedrooms"):
            qs = qs.filter(bedrooms__gte=p["bedrooms"])
        if p.get("featured") == "true":
            qs = qs.filter(featured=True)
        if p.get("search"):
            term = p["search"]
            qs = qs.filter(title__icontains=term) | qs.filter(location__icontains=term) | qs.filter(city__icontains=term)

        ordering = p.get("ordering")
        if ordering in ("price", "-price", "created_at", "-created_at"):
            qs = qs.order_by(ordering)
        return qs.distinct()


class PropertyDetailView(generics.RetrieveAPIView):
    """GET /api/properties/<slug>/"""
    queryset = Property.objects.prefetch_related("images").select_related("agent")
    serializer_class = PropertyDetailSerializer
    lookup_field = "slug"


class AgentListView(generics.ListAPIView):
    """GET /api/agents/"""
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer
    pagination_class = None


class AgentDetailView(generics.RetrieveAPIView):
    """GET /api/agents/<id>/"""
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer


class AgentPropertiesView(generics.ListAPIView):
    """GET /api/agents/<id>/properties/"""
    serializer_class = PropertyListSerializer
    pagination_class = None

    def get_queryset(self):
        return Property.objects.filter(agent_id=self.kwargs["pk"]).prefetch_related("images")


class InquiryCreateView(generics.CreateAPIView):
    """POST /api/inquiries/"""
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    authentication_classes = []

class AppointmentCreateView(generics.CreateAPIView):
    """POST /api/appointments/"""
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    authentication_classes = []