import { Request, Response } from "express";
import { ServiceRepository } from "../repositories/serviceRespository";
import { ServicePackageRepository } from "../repositories/servicePackageRepository";
import { PetRepository } from "../repositories/petRepository";
import { TutorRepository } from "../repositories/tutorRepository";

const tutorRepository = new TutorRepository();
const serviceRepository = new ServiceRepository();
const servicePackageRepository = new ServicePackageRepository();
const petRepository = new PetRepository();

class ServiceController {
  private createBiweeklyDates(initialDate: Date): Date[] {
    const dates: Date[] = [];

    dates.push(new Date(initialDate));

    const secondDate = new Date(initialDate);
    secondDate.setDate(initialDate.getDate() + 14);

    dates.push(secondDate);

    return dates;
  }

  private createWeeklyDates(initialDate: Date): Date[] {
    const dates: Date[] = [];

    dates.push(new Date(initialDate));

    for (let i = 0; i < 3; i++) {
      const newDate = new Date(initialDate);
      newDate.setDate(initialDate.getDate() + (i + 1) * 7);
      dates.push(newDate);
    }

    return dates;
  }

  async listAllServicesForPackageId(package_id: number) {
    const response = await serviceRepository.listByservicePackageId(package_id);

    return response;
  }

  async createIndependentService(request: Request, response: Response) {
    const { service_date, value, service_description } = request.body;

    try {
      const createdService = await this.create(
        0,
        service_date,
        value,
        service_description,
      );

      return response.status(200).json(createdService);
    } catch (error) {
      return response.status(500).json({
        error: "Erro ao criar serviço",
      });
    }
  }

  async create(
    service_package_id: number,
    service_date: Date,
    value: string,
    service_description: string,
  ) {
    let dates: Date[] = [];

    try {
      const results = [];

      const response =
        await servicePackageRepository.findOneById(service_package_id);

      if (response?.package_type === "Quinzenal") {
        dates = this.createBiweeklyDates(service_date);
      }

      if (response?.package_type === "Semanal") {
        dates = this.createWeeklyDates(service_date);
      }
      if (response?.package_type === "Único") {
        dates.push(new Date(service_date));
      }

      for (let i = 0; i < dates.length; i++) {
        const services = await serviceRepository.createAndSave(
          service_package_id,
          dates[i],
          0,
        );
        results.push(services);
      }

      return results;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async checkIfAllPackagesServicesIsDone(service_package_id: number) {
    const services =
      await serviceRepository.listByservicePackageId(service_package_id);

    return services;
  }

  async returnDateForPackageId(servicePackageId: number) {
    const date =
      await serviceRepository.returnDatesFromPackage(servicePackageId);

    return date;
  }

  async alterServiceDate(service_id: number, service_date: Date) {
    const service = await serviceRepository.alterServiceDate(
      service_id,
      service_date,
    );

    return service;
  }

  async removeDate(id: number) {
    try {
      const date = await serviceRepository.removeDate(id);

      return date;
    } catch (error) {
      return {
        message: "Não foi possível remover" + error,
      };
    }
  }

  async turnDoneThePassedServices() {
    await serviceRepository.turnDonethepPassedServices();
  }

  async returnServicesForDate(request: Request, response: Response) {
    const { first_date, last_date, service_done } = request.query;

    console.log(first_date, last_date);

    type Services = {
      id: number;
      service_package_id: number;
      service_date: Date;
      service_done: number;
      service_type?: string;
      tutor_name?: string;
      tutor_phone?: string;
      pet_name?: string;
      pkg_description?: string;
    };

    let ordenadeServices = await serviceRepository.listAllServices();

    if (service_done !== "") {
      ordenadeServices = ordenadeServices.filter(
        (item) => item.service_done === Number(service_done),
      );
    }

    let intervalDate: Services[] = ordenadeServices;

    for (const item of intervalDate) {
      const pkg = await servicePackageRepository.findOneById(
        item.service_package_id,
      );
      const pet = await petRepository.findById(pkg.pet_id);
      const tutor = await tutorRepository.findById(pet.id_tutor);
      item.service_type = pkg.package_type;
      item.pet_name = pet.name;
      item.tutor_name = tutor.tutor.tutorName;
      item.tutor_phone = tutor.tutor.tutorPhone;
      item.pkg_description = pkg.service_description;
    }

    intervalDate.sort(
      (a, b) =>
        new Date(a.service_date).getTime() - new Date(b.service_date).getTime(),
    );

    if (!first_date && !last_date) {
      return response.json({ intervalDate });
    }
    const initialDate = new Date(String(first_date));
    const limitDate = new Date(String(last_date));

    if (first_date && last_date) {
      intervalDate = ordenadeServices.filter(
        (item) =>
          new Date(item.service_date).getTime() >= initialDate.getTime() &&
          new Date(item.service_date).getTime() <= limitDate.getTime(),
      );
      return response.json({ intervalDate });
    }

    if (first_date) {
      intervalDate = ordenadeServices.filter(
        (item) =>
          new Date(item.service_date).getTime() >= initialDate.getTime(),
      );
      return response.json({ intervalDate });
    }

    if (last_date) {
      intervalDate = ordenadeServices.filter(
        (item) => new Date(item.service_date).getTime() <= limitDate.getTime(),
      );
      return response.json({ intervalDate });
    }
  }

  async alterServiceDoneStatus(request: Request, response: Response) {
    const { service_id } = request.body;

    const serviceRepository = new ServiceRepository();
    try {
      const serviceFound = serviceRepository.alterServiceDoneStatus(service_id);
      if (!serviceFound) {
        return response.status(404).json({
          message: "Serviço não encontrado",
        });
      }

      return response.status(200).json({
        message: "Status de finalizado alterado",
      });
    } catch (error) {
      return response.status(500).json({
        message: "Não foi possível acesar o banco" + error,
      });
    }
  }
}

export { ServiceController };
