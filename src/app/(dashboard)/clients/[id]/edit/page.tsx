import { getClientById, updateClient } from "../../actions";
import { notFound } from "next/navigation";
import { requireRole } from "@/utils/supabase/auth-helpers";

export default async function EditClientPage({ params }: { params: { id: string } }) {
  await requireRole(['admin', 'employee']);
  const client = await getClientById(params.id);

  if (!client) {
    notFound();
  }

  // Define a wrapper for the Server Action to include the ID
  async function handleUpdate(formData: FormData) {
    "use server";
    return await updateClient(params.id, formData);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Breadcrumbs / Header */}
      <div className="flex flex-col gap-4">
        <nav className="flex items-center gap-2 text-sm text-nordic-on-bg/40">
          <Link href="/clients" className="hover:text-nordic-primary transition-colors">Clientes</Link>
          <ChevronRight size={14} />
          <span className="text-nordic-on-bg/60">Editar Perfil</span>
        </nav>
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
            Editar: {client.first_name} {client.last_name}
          </h1>
          <p className="text-nordic-on-bg/60">Modifica los datos del cliente para mantener la base de datos actualizada.</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-nordic-surface-low/50 border border-nordic-outline-variant/10 rounded-3xl p-8 backdrop-blur-xl shadow-nordic-ambient">
        <form action={handleUpdate} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Nombre */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-white/80 flex items-center gap-2" htmlFor="first_name">
                <User size={16} className="text-nordic-primary" />
                Nombre
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                required
                defaultValue={client.first_name}
                className="w-full bg-nordic-bg/50 border border-nordic-outline-variant/20 rounded-xl px-5 py-4 text-white placeholder:text-nordic-on-bg/30 focus:outline-none focus:border-nordic-primary/50 focus:ring-4 focus:ring-nordic-primary/5 transition-all"
              />
            </div>

            {/* Apellido */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-white/80 flex items-center gap-2" htmlFor="last_name">
                <User size={16} className="text-nordic-primary" />
                Apellido
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                required
                defaultValue={client.last_name}
                className="w-full bg-nordic-bg/50 border border-nordic-outline-variant/20 rounded-xl px-5 py-4 text-white placeholder:text-nordic-on-bg/30 focus:outline-none focus:border-nordic-primary/50 focus:ring-4 focus:ring-nordic-primary/5 transition-all"
              />
            </div>

            {/* Email */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-white/80 flex items-center gap-2" htmlFor="email">
                <Mail size={16} className="text-nordic-primary" />
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                defaultValue={client.email}
                className="w-full bg-nordic-bg/50 border border-nordic-outline-variant/20 rounded-xl px-5 py-4 text-white placeholder:text-nordic-on-bg/30 focus:outline-none focus:border-nordic-primary/50 focus:ring-4 focus:ring-nordic-primary/5 transition-all"
              />
            </div>

            {/* Phone */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-white/80 flex items-center gap-2" htmlFor="phone">
                <Phone size={16} className="text-nordic-primary" />
                Teléfono de Contacto
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                defaultValue={client.phone || ""}
                placeholder="+34 600 000 000"
                className="w-full bg-nordic-bg/50 border border-nordic-outline-variant/20 rounded-xl px-5 py-4 text-white placeholder:text-nordic-on-bg/30 focus:outline-none focus:border-nordic-primary/50 focus:ring-4 focus:ring-nordic-primary/5 transition-all"
              />
            </div>

            {/* Empresa */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-white/80 flex items-center gap-2" htmlFor="company">
                <Building2 size={16} className="text-nordic-primary" />
                Empresa
              </label>
              <input
                id="company"
                name="company"
                type="text"
                defaultValue={client.company || ""}
                placeholder="Nombre de la empresa"
                className="w-full bg-nordic-bg/50 border border-nordic-outline-variant/20 rounded-xl px-5 py-4 text-white placeholder:text-nordic-on-bg/30 focus:outline-none focus:border-nordic-primary/50 focus:ring-4 focus:ring-nordic-primary/5 transition-all"
              />
            </div>

            {/* Plan */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-white/80 flex items-center gap-2" htmlFor="plan">
                <CreditCard size={16} className="text-nordic-primary" />
                Tipo de Plan
              </label>
              <input
                id="plan"
                name="plan"
                type="text"
                defaultValue={client.plan || ""}
                placeholder="Ej. Premium Desk"
                className="w-full bg-nordic-bg/50 border border-nordic-outline-variant/20 rounded-xl px-5 py-4 text-white placeholder:text-nordic-on-bg/30 focus:outline-none focus:border-nordic-primary/50 focus:ring-4 focus:ring-nordic-primary/5 transition-all"
              />
            </div>

            {/* Estado */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-white/80 flex items-center gap-2" htmlFor="status">
                <span className="w-1.5 h-1.5 rounded-full bg-nordic-primary animate-pulse" />
                Estado del Cliente
              </label>
              <select
                id="status"
                name="status"
                defaultValue={client.status}
                className="w-full bg-nordic-bg/50 border border-nordic-outline-variant/20 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-nordic-primary/50 focus:ring-4 focus:ring-nordic-primary/5 transition-all appearance-none cursor-pointer"
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>

          <div className="pt-6 border-t border-nordic-outline-variant/10 flex flex-col md:flex-row justify-end gap-4">
            <Link href="/clients">
              <Button variant="secondary" className="w-full md:w-auto" type="button">
                Cancelar
              </Button>
            </Link>
            <Button variant="primary" className="gap-2 w-full md:w-auto" type="submit">
              <Save size={18} />
              Guardar Cambios
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
