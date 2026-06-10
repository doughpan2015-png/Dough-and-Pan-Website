// import { useState, useRef } from "react";
// import { useLocation } from "wouter";
// import {
//   Plus,
//   Pencil,
//   Trash2,
//   UploadCloud,
//   X,
//   LogOut,
//   Eye,
//   EyeOff,
//   Star,
//   PackageCheck,
//   PackageX,
//   Loader2,
//   ChevronLeft,
// } from "lucide-react";
// import { useAuth } from "@/context/AuthContext";
// import {
//   useAllProducts,
//   useAddProduct,
//   useUpdateProduct,
//   useDeleteProduct,
//   useUploadProductImage,
//   type ProductFormData,
// } from "@/hooks/useProducts";
// import type { Product } from "@/lib/types";

// const CATEGORIES = ["Cakes", "Pastries", "Breads", "Cookies", "Beverages", "Desserts", "Hampers"];

// const FALLBACK = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80";

// const emptyForm = (): ProductFormData => ({
//   name: "",
//   category: "Cakes",
//   description: "",
//   price: 0,
//   image_url: "",
//   is_in_stock: true,
//   is_visible: true,
//   is_featured: false,
// });

// // ─── Confirm dialog ───────────────────────────────────────────────────────────
// function ConfirmDialog({
//   message,
//   onConfirm,
//   onCancel,
// }: {
//   message: string;
//   onConfirm: () => void;
//   onCancel: () => void;
// }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
//       <div className="bg-card rounded-2xl border border-border p-6 w-full max-w-sm shadow-xl">
//         <p className="text-foreground font-medium mb-6 text-center">{message}</p>
//         <div className="flex gap-3">
//           <button
//             onClick={onCancel}
//             className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Product form modal ───────────────────────────────────────────────────────
// function ProductModal({
//   initial,
//   onClose,
// }: {
//   initial: { id?: string; data: ProductFormData };
//   onClose: () => void;
// }) {
//   const [form, setForm] = useState<ProductFormData>(initial.data);
//   const [imagePreview, setImagePreview] = useState<string>(initial.data.image_url);
//   const [uploadError, setUploadError] = useState<string | null>(null);
//   const fileRef = useRef<HTMLInputElement>(null);

//   const add = useAddProduct();
//   const update = useUpdateProduct();
//   const upload = useUploadProductImage();

//   const isEdit = !!initial.id;
//   const busy = add.isPending || update.isPending || upload.isPending;

//   const set = <K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) =>
//     setForm((prev) => ({ ...prev, [key]: value }));

//   const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setUploadError(null);
//     try {
//       const url = await upload.mutateAsync(file);
//       set("image_url", url);
//       setImagePreview(url);
//     } catch (err: unknown) {
//       setUploadError(err instanceof Error ? err.message : "Upload failed");
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (isEdit && initial.id) {
//         await update.mutateAsync({ id: initial.id, data: form });
//       } else {
//         await add.mutateAsync(form);
//       }
//       onClose();
//     } catch {
//       // errors are surfaced via mutation state
//     }
//   };

//   const mutationError = add.error || update.error;

//   return (
//     <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm px-4 py-8 overflow-y-auto">
//       <div className="bg-card rounded-2xl border border-border w-full max-w-lg shadow-xl my-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-border">
//           <h2 className="font-serif text-lg font-bold text-foreground">
//             {isEdit ? "Edit Product" : "Add Product"}
//           </h2>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition"
//           >
//             <X className="w-4 h-4 text-foreground/60" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-5">
//           {/* Image upload */}
//           <div>
//             <label className="block text-sm font-medium text-foreground/80 mb-2">
//               Product Image
//             </label>
//             <div className="flex gap-4 items-start">
//               <div className="w-24 h-24 rounded-xl overflow-hidden border border-border bg-muted flex-shrink-0">
//                 <img
//                   src={imagePreview || FALLBACK}
//                   alt="preview"
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).src = FALLBACK;
//                   }}
//                 />
//               </div>
//               <div className="flex-1 space-y-2">
//                 <input
//                   ref={fileRef}
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFile}
//                   className="hidden"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => fileRef.current?.click()}
//                   disabled={upload.isPending}
//                   className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition disabled:opacity-60"
//                 >
//                   {upload.isPending ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : (
//                     <UploadCloud className="w-4 h-4" />
//                   )}
//                   {upload.isPending ? "Uploading…" : "Upload Image"}
//                 </button>
//                 <p className="text-xs text-foreground/50">Or paste a URL below</p>
//                 <input
//                   type="url"
//                   value={form.image_url}
//                   onChange={(e) => {
//                     set("image_url", e.target.value);
//                     setImagePreview(e.target.value);
//                   }}
//                   placeholder="https://..."
//                   className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
//                 />
//                 {uploadError && (
//                   <p className="text-xs text-red-500">{uploadError}</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium text-foreground/80 mb-1.5">
//               Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               required
//               value={form.name}
//               onChange={(e) => set("name", e.target.value)}
//               placeholder="e.g. Chocolate Truffle"
//               className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
//             />
//           </div>

//           {/* Category */}
//           <div>
//             <label className="block text-sm font-medium text-foreground/80 mb-1.5">
//               Category <span className="text-red-500">*</span>
//             </label>
//             <select
//               required
//               value={form.category}
//               onChange={(e) => set("category", e.target.value)}
//               className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
//             >
//               {CATEGORIES.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-foreground/80 mb-1.5">
//               Description
//             </label>
//             <textarea
//               value={form.description}
//               onChange={(e) => set("description", e.target.value)}
//               rows={3}
//               placeholder="Short product description…"
//               className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition resize-none"
//             />
//           </div>

//           {/* Price */}
//           <div>
//             <label className="block text-sm font-medium text-foreground/80 mb-1.5">
//               Price (₹) <span className="text-red-500">*</span>
//             </label>
//             <input
//               required
//               type="number"
//               min={0}
//               step={0.01}
//               value={form.price}
//               onChange={(e) => set("price", parseFloat(e.target.value) || 0)}
//               className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
//             />
//           </div>

//           {/* Toggles */}
//           <div className="grid grid-cols-3 gap-3">
//             {(
//               [
//                 { key: "is_visible", label: "Visible" },
//                 { key: "is_in_stock", label: "In Stock" },
//                 { key: "is_featured", label: "Featured" },
//               ] as { key: keyof ProductFormData; label: string }[]
//             ).map(({ key, label }) => (
//               <button
//                 key={key}
//                 type="button"
//                 onClick={() => set(key, !form[key])}
//                 className={`py-2.5 rounded-xl border text-xs font-semibold transition-all ${
//                   form[key]
//                     ? "bg-primary/10 border-primary/40 text-primary"
//                     : "bg-muted border-border text-foreground/50"
//                 }`}
//               >
//                 {label}
//                 <span className="block text-[10px] font-normal mt-0.5">
//                   {form[key] ? "ON" : "OFF"}
//                 </span>
//               </button>
//             ))}
//           </div>

//           {/* Submit error */}
//           {mutationError && (
//             <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
//               {mutationError.message}
//             </p>
//           )}

//           {/* Actions */}
//           <div className="flex gap-3 pt-1">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={busy}
//               className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//             >
//               {busy && <Loader2 className="w-4 h-4 animate-spin" />}
//               {isEdit ? "Save Changes" : "Add Product"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// // ─── Toggle button ────────────────────────────────────────────────────────────
// function ToggleBtn({
//   active,
//   onClick,
//   activeClass,
//   children,
// }: {
//   active: boolean;
//   onClick: () => void;
//   activeClass: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <button
//       onClick={onClick}
//       title={active ? "Click to disable" : "Click to enable"}
//       className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
//         active ? activeClass : "bg-muted text-foreground/30 hover:text-foreground/60"
//       }`}
//     >
//       {children}
//     </button>
//   );
// }

// // ─── Main page ────────────────────────────────────────────────────────────────
// export default function AdminProducts() {
//   const { signOut } = useAuth();
//   const [, navigate] = useLocation();

//   const { data: products = [], isLoading, error } = useAllProducts();
//   const update = useUpdateProduct();
//   const deleteProduct = useDeleteProduct();

//   const [modal, setModal] = useState<{
//     open: boolean;
//     id?: string;
//     data: ProductFormData;
//   }>({ open: false, data: emptyForm() });

//   const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
//   const [search, setSearch] = useState("");

//   const handleSignOut = async () => {
//     await signOut();
//     navigate("/admin/login");
//   };

//   const openAdd = () => setModal({ open: true, data: emptyForm() });

//   const openEdit = (p: Product) =>
//     setModal({
//       open: true,
//       id: p.id,
//       data: {
//         name: p.name,
//         category: p.category,
//         description: p.description,
//         price: p.price,
//         image_url: p.imageUrl,
//         is_in_stock: p.isInStock,
//         is_visible: p.isVisible,
//         is_featured: p.isFeatured,
//       },
//     });

//   const toggle = (id: string, field: "is_visible" | "is_in_stock" | "is_featured", current: boolean) => {
//     update.mutate({ id, data: { [field]: !current } });
//   };

//   const handleDelete = (id: string) => setConfirmDelete(id);
//   const confirmDeleteAction = () => {
//     if (confirmDelete) {
//       deleteProduct.mutate(confirmDelete);
//       setConfirmDelete(null);
//     }
//   };

//   const filtered = products.filter(
//     (p) =>
//       p.name.toLowerCase().includes(search.toLowerCase()) ||
//       p.category.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Top bar */}
//       <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => navigate("/")}
//               className="flex items-center gap-1.5 text-sm text-foreground/60 hover:text-foreground transition"
//             >
//               <ChevronLeft className="w-4 h-4" />
//               Site
//             </button>
//             <span className="text-foreground/20">|</span>
//             <h1 className="font-serif text-lg font-bold text-foreground">
//               Admin — Products
//             </h1>
//           </div>
//           <button
//             onClick={handleSignOut}
//             className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition"
//           >
//             <LogOut className="w-4 h-4" />
//             Sign out
//           </button>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Toolbar */}
//         <div className="flex flex-col sm:flex-row gap-3 mb-6">
//           <input
//             type="text"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search products…"
//             className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
//           />
//           <button
//             onClick={openAdd}
//             className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition flex-shrink-0"
//           >
//             <Plus className="w-4 h-4" />
//             Add Product
//           </button>
//         </div>

//         {/* Stats strip */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
//           {[
//             { label: "Total", value: products.length },
//             { label: "Visible", value: products.filter((p) => p.isVisible).length },
//             { label: "Featured", value: products.filter((p) => p.isFeatured).length },
//             { label: "Out of Stock", value: products.filter((p) => !p.isInStock).length },
//           ].map(({ label, value }) => (
//             <div
//               key={label}
//               className="bg-card rounded-xl border border-border px-4 py-3 text-center"
//             >
//               <p className="text-2xl font-bold text-foreground">{value}</p>
//               <p className="text-xs text-foreground/50 mt-0.5">{label}</p>
//             </div>
//           ))}
//         </div>

//         {/* Loading */}
//         {isLoading && (
//           <div className="flex items-center justify-center py-24">
//             <Loader2 className="w-8 h-8 animate-spin text-primary" />
//           </div>
//         )}

//         {/* Error */}
//         {error && (
//           <div className="text-center py-16 text-red-500">
//             <p>Failed to load products: {error.message}</p>
//           </div>
//         )}

//         {/* Table */}
//         {!isLoading && !error && (
//           <>
//             {/* Desktop table */}
//             <div className="hidden md:block bg-card rounded-2xl border border-border overflow-hidden">
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="border-b border-border bg-muted/40">
//                     <th className="text-left px-5 py-3.5 font-semibold text-foreground/70 w-16">
//                       Image
//                     </th>
//                     <th className="text-left px-5 py-3.5 font-semibold text-foreground/70">
//                       Name
//                     </th>
//                     <th className="text-left px-5 py-3.5 font-semibold text-foreground/70">
//                       Category
//                     </th>
//                     <th className="text-right px-5 py-3.5 font-semibold text-foreground/70">
//                       Price
//                     </th>
//                     <th className="text-center px-5 py-3.5 font-semibold text-foreground/70">
//                       Visible
//                     </th>
//                     <th className="text-center px-5 py-3.5 font-semibold text-foreground/70">
//                       Stock
//                     </th>
//                     <th className="text-center px-5 py-3.5 font-semibold text-foreground/70">
//                       Featured
//                     </th>
//                     <th className="px-5 py-3.5" />
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filtered.length === 0 && (
//                     <tr>
//                       <td colSpan={8} className="text-center py-16 text-foreground/40">
//                         No products found.
//                       </td>
//                     </tr>
//                   )}
//                   {filtered.map((p) => (
//                     <tr
//                       key={p.id}
//                       className="border-b border-border/60 last:border-0 hover:bg-muted/30 transition-colors"
//                     >
//                       <td className="px-5 py-3">
//                         <div className="w-12 h-12 rounded-lg overflow-hidden border border-border">
//                           <img
//                             src={p.imageUrl || FALLBACK}
//                             alt={p.name}
//                             className="w-full h-full object-cover"
//                             onError={(e) => {
//                               (e.target as HTMLImageElement).src = FALLBACK;
//                             }}
//                           />
//                         </div>
//                       </td>
//                       <td className="px-5 py-3 font-medium text-foreground">
//                         {p.name}
//                       </td>
//                       <td className="px-5 py-3">
//                         <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
//                           {p.category}
//                         </span>
//                       </td>
//                       <td className="px-5 py-3 text-right font-semibold text-foreground">
//                         ₹{p.price.toLocaleString("en-IN")}
//                       </td>
//                       <td className="px-5 py-3 text-center">
//                         <div className="flex justify-center">
//                           <ToggleBtn
//                             active={p.isVisible}
//                             onClick={() => toggle(p.id, "is_visible", p.isVisible)}
//                             activeClass="bg-blue-100 text-blue-600"
//                           >
//                             {p.isVisible ? (
//                               <Eye className="w-4 h-4" />
//                             ) : (
//                               <EyeOff className="w-4 h-4" />
//                             )}
//                           </ToggleBtn>
//                         </div>
//                       </td>
//                       <td className="px-5 py-3 text-center">
//                         <div className="flex justify-center">
//                           <ToggleBtn
//                             active={p.isInStock}
//                             onClick={() => toggle(p.id, "is_in_stock", p.isInStock)}
//                             activeClass="bg-green-100 text-green-600"
//                           >
//                             {p.isInStock ? (
//                               <PackageCheck className="w-4 h-4" />
//                             ) : (
//                               <PackageX className="w-4 h-4" />
//                             )}
//                           </ToggleBtn>
//                         </div>
//                       </td>
//                       <td className="px-5 py-3 text-center">
//                         <div className="flex justify-center">
//                           <ToggleBtn
//                             active={p.isFeatured}
//                             onClick={() => toggle(p.id, "is_featured", p.isFeatured)}
//                             activeClass="bg-amber-100 text-amber-500"
//                           >
//                             <Star
//                               className="w-4 h-4"
//                               fill={p.isFeatured ? "currentColor" : "none"}
//                             />
//                           </ToggleBtn>
//                         </div>
//                       </td>
//                       <td className="px-5 py-3">
//                         <div className="flex items-center gap-2 justify-end">
//                           <button
//                             onClick={() => openEdit(p)}
//                             className="w-8 h-8 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary flex items-center justify-center transition"
//                           >
//                             <Pencil className="w-3.5 h-3.5" />
//                           </button>
//                           <button
//                             onClick={() => handleDelete(p.id)}
//                             className="w-8 h-8 rounded-lg bg-muted hover:bg-red-100 hover:text-red-500 flex items-center justify-center transition"
//                           >
//                             <Trash2 className="w-3.5 h-3.5" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Mobile cards */}
//             <div className="md:hidden space-y-3">
//               {filtered.length === 0 && (
//                 <p className="text-center py-16 text-foreground/40">No products found.</p>
//               )}
//               {filtered.map((p) => (
//                 <div
//                   key={p.id}
//                   className="bg-card rounded-2xl border border-border p-4 flex gap-4"
//                 >
//                   <div className="w-16 h-16 rounded-xl overflow-hidden border border-border flex-shrink-0">
//                     <img
//                       src={p.imageUrl || FALLBACK}
//                       alt={p.name}
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         (e.target as HTMLImageElement).src = FALLBACK;
//                       }}
//                     />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-start justify-between gap-2">
//                       <div>
//                         <p className="font-semibold text-foreground text-sm truncate">
//                           {p.name}
//                         </p>
//                         <p className="text-xs text-foreground/50">{p.category}</p>
//                       </div>
//                       <p className="font-bold text-foreground text-sm flex-shrink-0">
//                         ₹{p.price.toLocaleString("en-IN")}
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-2 mt-3">
//                       <ToggleBtn
//                         active={p.isVisible}
//                         onClick={() => toggle(p.id, "is_visible", p.isVisible)}
//                         activeClass="bg-blue-100 text-blue-600"
//                       >
//                         {p.isVisible ? (
//                           <Eye className="w-4 h-4" />
//                         ) : (
//                           <EyeOff className="w-4 h-4" />
//                         )}
//                       </ToggleBtn>
//                       <ToggleBtn
//                         active={p.isInStock}
//                         onClick={() => toggle(p.id, "is_in_stock", p.isInStock)}
//                         activeClass="bg-green-100 text-green-600"
//                       >
//                         {p.isInStock ? (
//                           <PackageCheck className="w-4 h-4" />
//                         ) : (
//                           <PackageX className="w-4 h-4" />
//                         )}
//                       </ToggleBtn>
//                       <ToggleBtn
//                         active={p.isFeatured}
//                         onClick={() => toggle(p.id, "is_featured", p.isFeatured)}
//                         activeClass="bg-amber-100 text-amber-500"
//                       >
//                         <Star
//                           className="w-4 h-4"
//                           fill={p.isFeatured ? "currentColor" : "none"}
//                         />
//                       </ToggleBtn>
//                       <div className="flex items-center gap-2 ml-auto">
//                         <button
//                           onClick={() => openEdit(p)}
//                           className="w-8 h-8 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary flex items-center justify-center transition"
//                         >
//                           <Pencil className="w-3.5 h-3.5" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(p.id)}
//                           className="w-8 h-8 rounded-lg bg-muted hover:bg-red-100 hover:text-red-500 flex items-center justify-center transition"
//                         >
//                           <Trash2 className="w-3.5 h-3.5" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </main>

//       {/* Modals */}
//       {modal.open && (
//         <ProductModal
//           initial={{ id: modal.id, data: modal.data }}
//           onClose={() => setModal({ open: false, data: emptyForm() })}
//         />
//       )}

//       {confirmDelete && (
//         <ConfirmDialog
//           message="Delete this product? This cannot be undone."
//           onConfirm={confirmDeleteAction}
//           onCancel={() => setConfirmDelete(null)}
//         />
//       )}
//     </div>
//   );
// }


import { useState, useRef } from "react";
import { useLocation } from "wouter";
import {
  Plus,
  Pencil,
  Trash2,
  UploadCloud,
  X,
  LogOut,
  Eye,
  EyeOff,
  Star,
  PackageCheck,
  PackageX,
  Loader2,
  ChevronLeft,
  Settings
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  useAllProducts,
  useAddProduct,
  useUpdateProduct,
  useDeleteProduct,
  useUploadProductImage,
  type ProductFormData,
} from "@/hooks/useProducts";
import type { Product } from "@/lib/types";

const CATEGORIES = ["Cakes", "Pastries", "Breads", "Cookies", "Beverages", "Desserts", "Hampers"];

const FALLBACK = "https://images.unsplash.com/photo-1534432182912-63863115e106?w=400&q=80";

const emptyForm = (): ProductFormData => ({
  name: "",
  category: "Cakes",
  description: "",
  price: 0,
  image_url: "",
  is_in_stock: true,
  is_visible: true,
  is_featured: false,
});

// ─── Confirm dialog ───────────────────────────────────────────────────────────
function ConfirmDialog({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-card rounded-2xl border border-border p-6 w-full max-w-sm shadow-xl">
        <p className="text-foreground font-medium mb-6 text-center">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Product form modal ───────────────────────────────────────────────────────
function ProductModal({
  initial,
  onClose,
}: {
  initial: { id?: string; data: ProductFormData };
  onClose: () => void;
}) {
  const [form, setForm] = useState<ProductFormData>(initial.data);
  const [imagePreview, setImagePreview] = useState<string>(initial.data.image_url);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const add = useAddProduct();
  const update = useUpdateProduct();
  const upload = useUploadProductImage();

  const isEdit = !!initial.id;
  const busy = add.isPending || update.isPending || upload.isPending;

  const set = <K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    try {
      const url = await upload.mutateAsync(file);
      set("image_url", url);
      setImagePreview(url);
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit && initial.id) {
        await update.mutateAsync({ id: initial.id, data: form });
      } else {
        await add.mutateAsync(form);
      }
      onClose();
    } catch {
      // errors are surfaced via mutation state
    }
  };

  const mutationError = add.error || update.error;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm px-4 py-8 overflow-y-auto">
      <div className="bg-card rounded-2xl border border-border w-full max-w-lg shadow-xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-serif text-lg font-bold text-foreground">
            {isEdit ? "Edit Product" : "Add Product"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition"
          >
            <X className="w-4 h-4 text-foreground/60" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Image upload */}
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              Product Image
            </label>
            <div className="flex gap-4 items-start">
              <div className="w-24 h-24 rounded-xl overflow-hidden border border-border bg-muted flex-shrink-0">
                <img
                  src={imagePreview || FALLBACK}
                  alt="preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK;
                  }}
                />
              </div>
              <div className="flex-1 space-y-2">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={upload.isPending}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition disabled:opacity-60"
                >
                  {upload.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <UploadCloud className="w-4 h-4" />
                  )}
                  {upload.isPending ? "Uploading…" : "Upload Image"}
                </button>
                <p className="text-xs text-foreground/50">Or paste a URL below</p>
                <input
                  type="url"
                  value={form.image_url}
                  onChange={(e) => {
                    set("image_url", e.target.value);
                    setImagePreview(e.target.value);
                  }}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
                {uploadError && (
                  <p className="text-xs text-red-500">{uploadError}</p>
                )}
              </div>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1.5">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Chocolate Truffle"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1.5">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              placeholder="Short product description…"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition resize-none"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1.5">
              Price (₹) <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="number"
              min={0}
              step={0.01}
              value={form.price}
              onChange={(e) => set("price", parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
            />
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-3 gap-3">
            {(
              [
                { key: "is_visible", label: "Visible" },
                { key: "is_in_stock", label: "In Stock" },
                { key: "is_featured", label: "Featured" },
              ] as { key: keyof ProductFormData; label: string }[]
            ).map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => set(key, !form[key])}
                className={`py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  form[key]
                    ? "bg-primary/10 border-primary/40 text-primary"
                    : "bg-muted border-border text-foreground/50"
                }`}
              >
                {label}
                <span className="block text-[10px] font-normal mt-0.5">
                  {form[key] ? "ON" : "OFF"}
                </span>
              </button>
            ))}
          </div>

          {/* Submit error */}
          {mutationError && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {mutationError.message}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy}
              className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {busy && <Loader2 className="w-4 h-4 animate-spin" />}
              {isEdit ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Toggle button ────────────────────────────────────────────────────────────
function ToggleBtn({
  active,
  onClick,
  activeClass,
  children,
}: {
  active: boolean;
  onClick: () => void;
  activeClass: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={active ? "Click to disable" : "Click to enable"}
      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
        active ? activeClass : "bg-muted text-foreground/30 hover:text-foreground/60"
      }`}
    >
      {children}
    </button>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AdminProducts() {
  const { signOut } = useAuth();
  const [, navigate] = useLocation();

  const { data: products = [], isLoading, error } = useAllProducts();
  const update = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [modal, setModal] = useState<{
    open: boolean;
    id?: string;
    data: ProductFormData;
  }>({ open: false, data: emptyForm() });

  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const openAdd = () => setModal({ open: true, data: emptyForm() });

  const openEdit = (p: Product) =>
    setModal({
      open: true,
      id: p.id,
      data: {
        name: p.name,
        category: p.category,
        description: p.description,
        price: p.price,
        image_url: p.imageUrl,
        is_in_stock: p.isInStock,
        is_visible: p.isVisible,
        is_featured: p.isFeatured,
      },
    });

  const toggle = (id: string, field: "is_visible" | "is_in_stock" | "is_featured", current: boolean) => {
    update.mutate({ id, data: { [field]: !current } });
  };

  const handleDelete = (id: string) => setConfirmDelete(id);
  const confirmDeleteAction = () => {
    if (confirmDelete) {
      deleteProduct.mutate(confirmDelete);
      setConfirmDelete(null);
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 text-sm text-foreground/60 hover:text-foreground transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Site
            </button>
            <span className="text-foreground/20">|</span>
            <h1 className="font-serif text-lg font-bold text-foreground">
              Admin — Products
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/settings")}
              className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
          />
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Total", value: products.length },
            { label: "Visible", value: products.filter((p) => p.isVisible).length },
            { label: "Featured", value: products.filter((p) => p.isFeatured).length },
            { label: "Out of Stock", value: products.filter((p) => !p.isInStock).length },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-card rounded-xl border border-border px-4 py-3 text-center"
            >
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-foreground/50 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-16 text-red-500">
            <p>Failed to load products: {error.message}</p>
          </div>
        )}

        {/* Table */}
        {!isLoading && !error && (
          <>
            {/* Desktop table */}
            <div className="hidden md:block bg-card rounded-2xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-5 py-3.5 font-semibold text-foreground/70 w-16">
                      Image
                    </th>
                    <th className="text-left px-5 py-3.5 font-semibold text-foreground/70">
                      Name
                    </th>
                    <th className="text-left px-5 py-3.5 font-semibold text-foreground/70">
                      Category
                    </th>
                    <th className="text-right px-5 py-3.5 font-semibold text-foreground/70">
                      Price
                    </th>
                    <th className="text-center px-5 py-3.5 font-semibold text-foreground/70">
                      Visible
                    </th>
                    <th className="text-center px-5 py-3.5 font-semibold text-foreground/70">
                      Stock
                    </th>
                    <th className="text-center px-5 py-3.5 font-semibold text-foreground/70">
                      Featured
                    </th>
                    <th className="px-5 py-3.5" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-center py-16 text-foreground/40">
                        No products found.
                      </td>
                    </tr>
                  )}
                  {filtered.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-border/60 last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-5 py-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-border">
                          <img
                            src={p.imageUrl || FALLBACK}
                            alt={p.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = FALLBACK;
                            }}
                          />
                        </div>
                      </td>
                      <td className="px-5 py-3 font-medium text-foreground">
                        {p.name}
                      </td>
                      <td className="px-5 py-3">
                        <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right font-semibold text-foreground">
                        ₹{p.price.toLocaleString("en-IN")}
                      </td>
                      <td className="px-5 py-3 text-center">
                        <div className="flex justify-center">
                          <ToggleBtn
                            active={p.isVisible}
                            onClick={() => toggle(p.id, "is_visible", p.isVisible)}
                            activeClass="bg-blue-100 text-blue-600"
                          >
                            {p.isVisible ? (
                              <Eye className="w-4 h-4" />
                            ) : (
                              <EyeOff className="w-4 h-4" />
                            )}
                          </ToggleBtn>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <div className="flex justify-center">
                          <ToggleBtn
                            active={p.isInStock}
                            onClick={() => toggle(p.id, "is_in_stock", p.isInStock)}
                            activeClass="bg-green-100 text-green-600"
                          >
                            {p.isInStock ? (
                              <PackageCheck className="w-4 h-4" />
                            ) : (
                              <PackageX className="w-4 h-4" />
                            )}
                          </ToggleBtn>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <div className="flex justify-center">
                          <ToggleBtn
                            active={p.isFeatured}
                            onClick={() => toggle(p.id, "is_featured", p.isFeatured)}
                            activeClass="bg-amber-100 text-amber-500"
                          >
                            <Star
                              className="w-4 h-4"
                              fill={p.isFeatured ? "currentColor" : "none"}
                            />
                          </ToggleBtn>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => openEdit(p)}
                            className="w-8 h-8 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary flex items-center justify-center transition"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="w-8 h-8 rounded-lg bg-muted hover:bg-red-100 hover:text-red-500 flex items-center justify-center transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {filtered.length === 0 && (
                <p className="text-center py-16 text-foreground/40">No products found.</p>
              )}
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className="bg-card rounded-2xl border border-border p-4 flex gap-4"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-border flex-shrink-0">
                    <img
                      src={p.imageUrl || FALLBACK}
                      alt={p.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK;
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-foreground text-sm truncate">
                          {p.name}
                        </p>
                        <p className="text-xs text-foreground/50">{p.category}</p>
                      </div>
                      <p className="font-bold text-foreground text-sm flex-shrink-0">
                        ₹{p.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <ToggleBtn
                        active={p.isVisible}
                        onClick={() => toggle(p.id, "is_visible", p.isVisible)}
                        activeClass="bg-blue-100 text-blue-600"
                      >
                        {p.isVisible ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </ToggleBtn>
                      <ToggleBtn
                        active={p.isInStock}
                        onClick={() => toggle(p.id, "is_in_stock", p.isInStock)}
                        activeClass="bg-green-100 text-green-600"
                      >
                        {p.isInStock ? (
                          <PackageCheck className="w-4 h-4" />
                        ) : (
                          <PackageX className="w-4 h-4" />
                        )}
                      </ToggleBtn>
                      <ToggleBtn
                        active={p.isFeatured}
                        onClick={() => toggle(p.id, "is_featured", p.isFeatured)}
                        activeClass="bg-amber-100 text-amber-500"
                      >
                        <Star
                          className="w-4 h-4"
                          fill={p.isFeatured ? "currentColor" : "none"}
                        />
                      </ToggleBtn>
                      <div className="flex items-center gap-2 ml-auto">
                        <button
                          onClick={() => openEdit(p)}
                          className="w-8 h-8 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary flex items-center justify-center transition"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="w-8 h-8 rounded-lg bg-muted hover:bg-red-100 hover:text-red-500 flex items-center justify-center transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Modals */}
      {modal.open && (
        <ProductModal
          initial={{ id: modal.id, data: modal.data }}
          onClose={() => setModal({ open: false, data: emptyForm() })}
        />
      )}

      {confirmDelete && (
        <ConfirmDialog
          message="Delete this product? This cannot be undone."
          onConfirm={confirmDeleteAction}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}