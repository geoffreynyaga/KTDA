from django.shortcuts import render
from django.views.generic import CreateView, DetailView, ListView, TemplateView

from environment.forms import (
    CoachingAndMentorshipForm,
    LMEIndividualSalesForm,
    LMESalesForm,
    TrainingForm,
    TreeGrowingForm,
)
from environment.models import (
    LME,
    CoachingAndMentorship,
    LMESales,
    Training,
    TreeGrowing,
)


class LMEMainView(TemplateView):
    template_name = "environment/LMEMain.html"


class CapacityBuildingIndividualAddView(TemplateView):
    template_name = "environment/CapacityBuildingIndividualAdd.html"


class CoachingAndMentorshipCreateView(CreateView):
    queryset = CoachingAndMentorship.objects.all()
    template_name = "environment/CNMAdd.html"
    form_class = CoachingAndMentorshipForm
    # fields = "__all__"

    success_url = "/ui/lme/cnm/"


class LMECreateView(CreateView):
    queryset = LME.objects.all()
    template_name = "environment/LMECreate.html"
    fields = (
        # "owner",
        "name",
        "factory",
        "email",
        # "no_of_employees",
        "no_of_female_employees",
        "no_of_male_employees",
        "county",
        "sub_county",
        "ward",
        "types_of_stove",
        "contact_person",
        "age_group",
        "phone_number",
    )
    success_url = "/ui/lme/list/"


class LMEDetailView(DetailView):
    queryset = LME.objects.all()
    template_name = "environment/LMEDetail.html"
    # fields = "__all__"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        slug = self.kwargs.get("slug")
        lme = LME.objects.get(slug=slug)
        # get last three sales
        sales = LMESales.objects.filter(lme=lme).order_by("-date_of_purchase")[:3]
        context["sales"] = sales
        # get trainings attended

        all_trainings = Training.objects.all().filter(lme_attendees__id=lme.id)
        # print(all_trainings,"all trainings")
        context["all_trainings"] = all_trainings
        return context


class SalesCreateView(CreateView):
    queryset = LMESales.objects.all()
    template_name = "environment/LMESalesCreate.html"
    form_class = LMESalesForm

    # fields = (
    #     "lme",
    #     "customer_name",
    #     "customer_phone_number",
    #     "stove",
    #     "stove_price",
    #     "date_of_purchase",
    # )
    success_url = "/ui/lme/sales/"


class LMEIndividualSalesCreateView(CreateView):
    queryset = LMESales.objects.all()
    template_name = "environment/LMEIndividualSalesCreate.html"
    form_class = LMEIndividualSalesForm

    success_url = "/"

    def form_valid(self, form):
        self.object = form.save(commit=False)
        # print(self.request.user,"sould be user")
        lme = LME.objects.all().filter(owner=self.request.user).first()
        # print(lme, "lme")
        self.object.lme = lme
        self.object.save()
        return super().form_valid(form)


class TrainingCreateView(CreateView):
    queryset = Training.objects.all()
    template_name = "environment/TrainingCreate.html"
    form_class = TrainingForm

    success_url = "/ui/lme/training/"

    # fields = (
    #     "course_name",
    #     "factory",
    #     "venue",
    #     "lme_attendees",
    #     "start_date",
    #     "end_date",
    #     "number_of_attendees",
    #     "number_of_female_attendees",
    #     "number_of_male_attendees",
    #     "number_below_20",
    #     "number_20_29",
    #     "number_30_39",
    #     "number_40_49",
    #     "number_50_59",
    #     "number_60_69",
    #     "number_70_79",
    #     "number_80_above",
    # )


class TreeGrowingCreateView(CreateView):
    queryset = TreeGrowing.objects.all()
    template_name = "environment/TreeGrowingCreate.html"
    form_class = TreeGrowingForm
    # fields = "__all__"

    success_url = "/ui/lme/tree-growing/"


class LMEIndividualTrainingListView(ListView):
    queryset = Training.objects.all()
    template_name = "environment/LMEIndividualTraining.html"

    success_url = "/"
    context_object_name = "trainings"

    def get_queryset(self):
        lme = LME.objects.all().filter(owner=self.request.user).first()
        trainings = Training.objects.all().filter(lme_attendees=lme)
        # print(trainings, "trainings")

        return trainings


class LMEIndividualCNMListView(ListView):
    queryset = CoachingAndMentorship.objects.all()
    template_name = "environment/LMEIndividualCNM.html"

    success_url = "/"
    context_object_name = "trainings"

    def get_queryset(self):
        lme = LME.objects.all().filter(owner=self.request.user).first()
        trainings = CoachingAndMentorship.objects.filter(lme=lme)
        # print(trainings, "trainings")

        return trainings
